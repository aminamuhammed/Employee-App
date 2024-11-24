import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const AddEmployee = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isUpdate = location.state?.employee; // Check if updating
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    designation: '',
    location: '',
    salary: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Populate form data if updating
  useEffect(() => {
    if (isUpdate) {
      setFormData(location.state.employee);
    }
  }, [isUpdate, location.state]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
    setError(''); // Clear error when user starts typing
  };

  // Handle form submission for Add or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, designation, location, salary } = formData;

    // Validate required fields
    if ([name, email, designation, location, salary].some((field) => !field)) {
      setError('All fields are required.');
      return;
    }

    const url = isUpdate
      ? `http://localhost:5000/emp/updateemployee/${formData._id}`
      : 'http://localhost:5000/emp/createemployee';

    const method = isUpdate ? 'put' : 'post';

    try {
      const response = await axios[method](url, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const successMessage = isUpdate
        ? 'Employee updated successfully.'
        : 'Employee added successfully.';
      setSuccess(successMessage);

      setTimeout(() => {
        navigate('/admindashboard');
      }, 2000); // Navigate back to dashboard after success message
    } catch (err) {
      const message = err.response?.data?.message || 'Operation failed.';
      setError(message);
      console.error('Error submitting employee:', err);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>
        {isUpdate ? 'Update Employee' : 'Add Employee'}
      </h2>
      {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</div>}
      {success && <div style={{ color: 'green', textAlign: 'center', marginBottom: '10px' }}>{success}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', }}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="designation" style={{ display: 'block', marginBottom: '5px' }}>Designation</label>
          <input
            type="text"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="location" style={{ display: 'block', marginBottom: '5px' }}>Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="salary" style={{ display: 'block', marginBottom: '5px' }}>Salary</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {isUpdate ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;

