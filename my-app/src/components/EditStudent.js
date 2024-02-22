import React, { useState } from 'react';
import axios from "axios";

const EditStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    ID: '',
    points: '',
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
      await axios.post("/edit", formData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Edit Student {formData.ID}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
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
        <label>
          Points:
          <input
            type="points"
            name="points"
            value={formData.points}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditStudent;