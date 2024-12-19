import React, { useState } from "react";
import { Tabs, Select } from "antd";
import { DatePicker, Space } from "antd";
import toast from "react-hot-toast";
import ProfileInformation from "../components/RiderOnboarding/ProfileInformation";
import UploadDocuments from "../components/RiderOnboarding/UploadDocuments";
import BankDetails from "../components/RiderOnboarding/BankDetails";
const { TabPane } = Tabs;
const dateFormat = "YYYY/MM/DD";

const PortalDashboard = () => {
  const [activetab, setActiveTab] = useState("1");
  return (
    <div className="text-sm h-full w-1/2 my-4 ">
      <div className="text-xl my-4 mx-2">
        <h1>
          Welcome to Mesky Onboarding Portal.Please follow the steps for a
          smooth for a smooth onboarding process
        </h1>
      </div>
      <div className="flex text-center justify-between text-bg w-full  ">
        <div className="w-full">
          <Tabs
            activeKey={activetab}
            onChange={setActiveTab}
            style={{
              fontFamily: "Fredoka",
              width: "100%",
              justifyContent: "space-between",
              margin: "20px",
            }}
          >
            <TabPane
              tab={tabHeader("Profile information", activetab, "1")}
              key="1"
            >
              <ProfileInformation setActiveTab={setActiveTab} />
            </TabPane>

            <TabPane tab={tabHeader("Bank Details", activetab, "2")} key="2">
              <BankDetails setActiveTab={setActiveTab} />
            </TabPane>

            <TabPane
              tab={tabHeader("Upload Documents", activetab, "3")}
              key="3"
            >
              <UploadDocuments />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const tabHeader = (name, activetab, tabKey) => (
  
  <span
    style={{
      color:
        activetab === tabKey ? "rgb(220,0,209) flex" : "rgb(180,180,180) flex",
    }}
  >
    <span className="flex space-x-2">
      <div
        className={` ${
          activetab === tabKey
            ? "h-[20px] w-[20px] flex items-center justify-center rounded-full text-bold text-white text-bg bg-pink-400"
            : "rounded-full text-bg bg-lightgrey-400 text-semibold"
        }`}
        
      >
        {tabKey}.
      </div>
      <div style={{ color: "black" }}>{name}</div>
     

    </span>
  </span>
);






export default PortalDashboard;
