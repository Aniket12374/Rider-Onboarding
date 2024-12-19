import React, { useEffect } from "react";
import { Table } from "antd";
import { useState } from "react";

const columnsData = [
  {
    title: "FirstName",
    dataIndex: "firstname",
    key: "firstname",
  },
  {
    title: "LastName",
    dataIndex: "lastname",
    key: "lastname",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
    Key: "mobile",
  },
];

const data = [
  {
    key: "1",
    firstname: "Aniket",
    lastname: "Chaudhary",
    address: "Gurgaon",
    mobile: 9876045675,
  },
  {
    key: "2",
    firstname: "Rajesh",
    lastname: "Kumar",
    address: "Delhi",
    mobile: 9823450971,
  },
  {
    key: "3",
    firstname: "Amit",
    lastname: "Sharma",
    address: "Noida",
    mobile: 6456790856,
  },
  {
    key: "4",
    firstname: "Kuldeep",
    lastname: "Pal",
    address: "Gurgaon",
    mobile: 9856790543,
  },
];

const Form = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    mobile: "",
  });
  const [data, columnsData] = useState([]);

  function handleSubmit(e) {
    alert("Form has successfully submitted");
    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.address ||
      !formData.mobile
    ) {
      alert("All fields are compulsory to register the form");
    }

    columnsData((data) => [{ ...data, formData }]);
    setFormData({ firstname: "", lastname: "", address: "", mobile: "" });
    console.log(columnsData);
  }

  function handleChange(e) {
    setFormData((formData) => [
      { ...formData, [e.target.name]: e.target.value },
    ]);
  }
  return (
    <div
      style={{
        width: "30%",
        height: "60%",
        backgroundColor: "lightgreen",
        margin: "20px",
        padding: "20px",
      }}
    >
      <h2 className="form">User Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ width: "30%", height: "60%" }}>
          Firstname:
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Enter your first name"
          ></input>
          <br></br>
          Lastname:
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Enter your last name"
          ></input>
          <br></br>
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
          ></input>
          <br></br>
          Mobile:
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile"
          ></input>
          <br></br>
          <button
            type="submit"
            onSubmit={() => {
              columnsData((data) => [{ ...data, formData }]);
            }}
            style={{
              backgroundColor: "red",
              color: "Black",
              border: "1px solid black",
              margin: "50px",
              height: "40px",
              width: "80%",
            }}
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};

const FormData = () => (
  <>
    <Table columns={columnsData} dataSource={data} />
    <div>
      <Form />
    </div>
  </>
);

export default FormData;
