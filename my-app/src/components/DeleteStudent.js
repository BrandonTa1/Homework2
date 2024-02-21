import React, { useState } from 'react';

const DeleteStudent = () => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for handling the form data (e.g., sending it to a server)
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <h1>Delete Student</h1>
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

export default DeleteStudent;