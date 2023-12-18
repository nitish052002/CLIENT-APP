import "./form.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../config";

function ClientForm() {
  const [formaData, setFormData] = useState({});

  const createClient = async () => {
    try {
      if (formaData) {
        await axios.post(`${BASE_URL}/clients/`, formaData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formHandler = (event) => {
    setFormData((prev) => {
      setFormData({
        ...prev,
        [event.target.name]: event.target.value,
      });
    });
  };

  return (
    <div className="form">
      <h2>Create Client</h2>
      <form action="">
        <div className="input-groups">
          <label htmlFor="">Firstname</label>
          <input
            type="text"
            name="firstname"
            id="firstName"
            onChange={formHandler}
            required
          />
          <label htmlFor="">LastName</label>
          <input
            type="text"
            name="lastname"
            id="lastName"
            onChange={formHandler}
            required
          />
          <label htmlFor="">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={formHandler}
            required
          />
          <label htmlFor="">Mobile No</label>
          <input
            type="text"
            name="mobno"
            id="mob"
            onChange={formHandler}
            required
          />

          <label htmlFor="">Project</label>
          <input
            type="text"
            name="project"
            id="project"
            onChange={formHandler}
            required
          />
          <button className="submit" onClick={createClient}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ClientForm;
