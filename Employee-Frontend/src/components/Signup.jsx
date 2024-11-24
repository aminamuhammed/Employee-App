import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'user', // Default role is 'user'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const apiUrl = import.meta.env.VITE_BLOGGER_API || 'http://localhost:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Destructuring formData for cleaner access
    const { name, email, phone, password, role } = formData;

    // Client-side validation
    if (!name || !email || !phone || !password) {
      alert('All fields are required');
      return;
    }

    try {
      // Sending POST request with formData
      const response = await axios.post(`${apiUrl}/user/signup`, formData);

      // If the signup is successful, navigate to the home page
      if (response.data) {
        console.log('Signup successful');
        navigate('/'); // Redirect to home page
      }
    } catch (error) {
      console.error(error.response?.data || 'Signup failed');
    }
  };

  return (
    <div className='container'>
      <h2>Create an account</h2>
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="email">Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <input
            type='number'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="password">Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
          <br />

          {/* Role Selection */}
          <div>
            <label>Role:</label>
            <input
              type='radio'
              id='role-user'
              name='role'
              value='user'
              checked={formData.role === 'user'}
              onChange={handleRoleChange}
            />
            <label htmlFor='role-user'>User</label>
            <input
              type='radio'
              id='role-admin'
              name='role'
              value='admin'
              checked={formData.role === 'admin'}
              onChange={handleRoleChange}
            />
            <label htmlFor='role-admin'>Admin</label>
          </div>
          <br />
          <Link style={{color:'blue', textDecoration:'none'}} to={'/'}>Registered user? please click here</Link><br/><br/>
          <button 
          type='submit'
          style={{
            padding: '10px 20px',
            fontSize: '1rem', 
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
            fontWeight: '600',
          }}
          >SignUp</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
