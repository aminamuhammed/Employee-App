import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const apiUrl = import.meta.env.VITE_BLOGGER_API || 'http://localhost:5000';
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${apiUrl}/user/login`, formData);
      console.log('Login Response:', response);  // Log the response
  
      // Store the token and user data in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
  
      // Redirect based on role (admin or user)
      if (response.data.user.role === 'admin') {
        navigate('/admindashboard');
        window.location.reload(); 
      } else {
        navigate('/userdashboard');
      }
    } catch (error) {
      setError(error.response?.data.error || 'Login failed');
    }
  };
  

  return (
    <div className='container'>
      <h2>EmployeeApp Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <br/>
        <Link style={{color:'blue', textDecoration:'none'}} to={'/signup'}>New user? Please click here</Link><br/><br/>
        <button 
        type="submit"
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
        >Login</button>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
