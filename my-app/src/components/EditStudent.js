import React, { useState } from 'react';
import axios from "axios";

const EditStudent = () => {
  // Step 2: Use state to manage form data
  const [formData, setFormData] = useState({
    name: '',
    ID: '',
    points: '',
  });

  // Step 3: Event handler to update form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Step 4: Handle form submission
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
      {/* Step 1: Define the form elements */}
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