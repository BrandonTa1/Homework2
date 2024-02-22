import React, { useState } from 'react';
import axios from "axios";

const DeleteStudent = () => {
  const [formData, setFormData] = useState({
    ID: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/delete", formData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Delete Student</h1>
      <form onSubmit={handleSubmit}>
        <br />
        <label>
          ID:
          <input
            type="ID"
            name="ID"
            value={formData.ID}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DeleteStudent;