import { useEffect, useState } from "react";
import Button from "../Common/Button";
import { httpVendor, httpVendorUpload } from "../../services/api-client";
import { addRider, getSocieties } from "../../services/riders/riderService";
import toast from "react-hot-toast";
import Select from "react-select";
import { DatePicker } from "antd";
import moment from "moment";

const dateFormat = "YYYY/MM/DD";

const AgentCreation = ({ setShowAgentCreation }) => {
  const [agent, setAgent] = useState({});
  const [socitiesList, setSocitiesList] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({
    dl: false,
    adhar_front: false,
    adhar_back: false,
    veh_n_pl_im: false,
    veh_rc: false,
    veh_is: false,
    poll_ch: false,
  });

  const handleChange = (key, value) => {
    setAgent((prev) => ({ ...prev, ...{ [key]: value } }));
  };

  const handleUpload = (event, key) => {
    let files = event.target.files;

    // Check if a file is selected
    if (files.length === 0) {
      return; // No file selected
    }

    // Check file type
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
    ];
    const fileType = files[0].type;

    // Extract file extension from the file name
    const fileName = files[0].name;
    const fileExtension = fileName.split(".").pop().toLowerCase();

    // Check both MIME type and file extension
    if (
      !allowedTypes.includes(fileType) ||
      !["pdf", "jpeg", "jpg", "png"].includes(fileExtension)
    ) {
      // Invalid file type
      toast.error("Please upload PDF, JPEG, JPG, or PNG files only.");
      return;
    }

    // Proceed with file upload
    const formData = new FormData();
    formData.append("files", files[0], fileName);

    httpVendorUpload
      .post("/api/upload/multiple-image", formData)
      .then((res) => {
        const links = res.data.links;
        handleChange(key, links.length > 0 ? links[0] : null);
        setUploadedFiles((prev) => ({ ...prev, [key]: true }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveAgent = () => {
    // Define required fields including documents
    const requiredFields = [
      "full_name",
      "mobile_number",
      "dl",
      "adhar_front",
      "adhar_back",
      "veh_n_pl_im",
      "veh_rc",
      "veh_is",
      "poll_ch",
    ];

    // Check if required fields are filled
    const missingFields = requiredFields.filter((field) => !agent[field]);

    // If any required fields are missing, show error message
    if (missingFields.length > 0) {
      const errorMessage = "Please fill all the required fields.";
      return toast.error(errorMessage);
    }

    const mobile_number = agent.mobile_number;

    if (/\s/.test(mobile_number)) {
      toast.error("Phone number should not contain spaces.");
      return;
    }

    if (!/^\d{10}$/.test(mobile_number)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    // Save agent information
    addRider(agent)
      .then((res) => {
        toast.success("Saved successfully");
        setShowAgentCreation(false);
      })
      .catch((err) => {
        console.log({ err });
        toast.error(err?.response?.data.message);
      });
  };

  const handleSelectOption = (selectedOption) => {
    handleChange(
      "society",
      selectedOption.map((x) => x.value)
    );
  };

  useEffect(() => {
    getSocieties().then((res) => {
      let list = res?.data?.data?.map((x) => ({
        label: x.sector,
        value: x.id,
      }));
      setSocitiesList(list);
    });
  }, []);

  const issueDts = [
    "dl_i_date",
    "adhar_i_date",
    "veh_n_pl_im_i_date",
    "veh_rc_i_date",
    "poll_ch_i_date",
  ];

  const expDts = [
    "dl_ex_date",
    "adhar_ex_date",
    "veh_n_pl_im_ex_date",
    "veh_rc_ex_date",
    "poll_ch_ex_date",
  ];

  const dateFormat = "YYYY-MM-DD";

  function disabledFutureDate(current) {
    return current && current > moment().endOf("day");
  }

  function disabledPastDate(current) {
    return current && current < moment().startOf("day");
  }

  return (
    <div>
      <div className="flex justify-end">
        <Button btnName={"Save"} onClick={handleSaveAgent} />
        <Button
          btnName={"Cancel"}
          onClick={() => setShowAgentCreation(false)}
        />
      </div>
      <div className="flex space-x-5 w-full justify-start">
        <div className="w-[40%] space-y-2">
          <div className="">
            <label>Full Name</label>
            <input
              type="text"
              className="w-full h-12 rounded-lg border-select__control p-2"
              value={agent?.full_name}
              onChange={(e) => handleChange("full_name", e.target.value)}
            />
          </div>
          <div className="">
            <label>Phone Number (example : 8130067178)</label>
            <input
              type="text"
              className="w-full h-12 rounded-lg  border-select__control  p-2"
              value={agent?.mobile_number}
              onChange={(e) => handleChange("mobile_number", e.target.value)}
            />
          </div>
        </div>
        <div className="w-[40%]">
          <div>
            <label>Assigned Area</label>
            <Select
              options={socitiesList}
              isMulti
              classNamePrefix="border-select"
              placeholder="Please select areas"
              onChange={handleSelectOption}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="font-bold text-2xl">Documents</div>
        <div className="flex justify-evenly w-full">
          <div className="w-1/2 flex justify-evenly">
            <div className="space-y-4">
              <div className="text-lg font-medium">TYPE</div>
              <div>Driving License</div>
              <div>Aadhaar Card</div>
              <div>Vehicle Name Plate Image</div>
              <div>Vehicle RC</div>
              <div>Vehicle Insurance</div>
              <div>Vehicle (PUC) Pollution Check</div>
            </div>
            <div className="space-y-3 w-2/5">
              <div className="text-lg text-center font-medium">DOCUMENT</div>
              <div className="upload-container">
                <label
                  htmlFor="driving-license"
                  className={`w-full block text-center rounded-2xl ${
                    uploadedFiles.dl ? "bg-red-500" : "bg-[#df4584]"
                  } shadow-md shadow-slate-400 text-white py-[2px] text-base`}
                >
                  {uploadedFiles.dl ? "Uploaded" : "Upload"}
                </label>
                <input
                  type="file"
                  id="driving-license"
                  name="driving-license"
                  onChange={(e) => handleUpload(e, "dl")}
                  hidden
                />
              </div>

              <div className="flex justify-between">
                <div className="upload-container w-[49%]">
                  <label
                    htmlFor="aadhar-card-front"
                    className={`w-full block text-center rounded-2xl ${
                      uploadedFiles.adhar_front ? "bg-red-500" : "bg-[#df4584]"
                    } shadow-md shadow-slate-400 text-white py-[2px] text-base`}
                  >
                    {uploadedFiles.adhar_front ? "Uploaded" : "Upload"}
                  </label>
                  <input
                    type="file"
                    id="aadhar-card-front"
                    name="aadhar-card-front"
                    onChange={(e) => handleUpload(e, "adhar_front")}
                    hidden
                  />
                </div>
                <div className="upload-container w-[49%]">
                  <label
                    htmlFor="aadhar-card-back"
                    className={`w-full block text-center rounded-2xl ${
                      uploadedFiles.adhar_back ? "bg-red-500" : "bg-[#df4584]"
                    } shadow-md shadow-slate-400 text-white py-[2px] text-base`}
                  >
                    {uploadedFiles.adhar_back ? "Uploaded" : "Upload"}
                  </label>
                  <input
                    type="file"
                    id="aadhar-card-back"
                    name="aadhar-card-back"
                    onChange={(e) => handleUpload(e, "adhar_back")}
                    hidden
                  />
                </div>
              </div>
              <div className="upload-container">
                <label
                  htmlFor="vehicle-name-plate"
                  className={`w-full block text-center rounded-2xl ${
                    uploadedFiles.veh_n_pl_im ? "bg-red-500" : "bg-[#df4584]"
                  } shadow-md shadow-slate-400 text-white py-[2px] text-base`}
                >
                  {uploadedFiles.veh_n_pl_im ? "Uploaded" : "Upload"}
                </label>
                <input
                  type="file"
                  id="vehicle-name-plate"
                  name="vehicle-name-plate"
                  onChange={(e) => handleUpload(e, "veh_n_pl_im")}
                  hidden
                />
              </div>
              <div className="upload-container">
                <label
                  htmlFor="vehicle-rc"
                  className={`w-full block text-center rounded-2xl ${
                    uploadedFiles.veh_rc ? "bg-red-500" : "bg-[#df4584]"
                  } shadow-md shadow-slate-400 text-white py-[2px] text-base`}
                >
                  {uploadedFiles.veh_rc ? "Uploaded" : "Upload"}
                </label>
                <input
                  type="file"
                  id="vehicle-rc"
                  name="vehicle-rc"
                  onChange={(e) => handleUpload(e, "veh_rc")}
                  hidden
                />
              </div>
              <div className="upload-container">
                <label
                  htmlFor="vehicle-insurance"
                  className={`w-full block text-center rounded-2xl ${
                    uploadedFiles.veh_is ? "bg-red-500" : "bg-[#df4584]"
                  } shadow-md shadow-slate-400 text-white py-[2px] text-base`}
                >
                  {uploadedFiles.veh_is ? "Uploaded" : "Upload"}
                </label>
                <input
                  type="file"
                  id="vehicle-insurance"
                  name="vehicle-insurance"
                  onChange={(e) => handleUpload(e, "veh_is")}
                  hidden
                />
              </div>
              <div className="upload-container">
                <label
                  htmlFor="vehicle-puc"
                  className={`w-full block text-center rounded-2xl ${
                    uploadedFiles.poll_ch ? "bg-red-500" : "bg-[#df4584]"
                  } shadow-md shadow-slate-400 text-white py-[2px] text-base`}
                >
                  {uploadedFiles.poll_ch ? "Uploaded" : "Upload"}
                </label>
                <input
                  type="file"
                  id="vehicle-puc"
                  name="vehicle-puc"
                  onChange={(e) => handleUpload(e, "poll_ch")}
                  hidden
                />
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-evenly">
            <div className="space-y-4">
              <div className="text-lg font-medium">ISSUE DATE</div>
              {issueDts.map((x) => (
                <div key={x} className="border-[#808080] border rounded-md">
                  <DatePicker
                    placeholder={"select date"}
                    format={dateFormat}
                    disabledDate={disabledFutureDate}
                    onChange={(date, dateString) => {
                      handleChange(x, dateString);
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="text-lg font-medium">EXPIRY DATE</div>
              {expDts.map((x) => (
                <div key={x} className="border-[#808080] border rounded-md">
                  <DatePicker
                    format={dateFormat}
                    placeholder={"select date"}
                    disabledDate={disabledPastDate}
                    onChange={(date, dateString) => {
                      handleChange(x, dateString);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCreation;
