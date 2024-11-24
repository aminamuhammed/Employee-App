import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // React Router for navigation

const UserDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use navigate to redirect after logout

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://localhost:5000/emp/employee', config);
        setEmployees(response.data);
      } catch (err) {
        if (err.response?.status === 401) {
          setError('Session expired. Please log in again.');
          localStorage.removeItem('token');
        } else {
          setError('Failed to fetch employees');
        }
      }
    };

    fetchEmployees();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from localStorage
    navigate('/login'); // Redirect to the login page (replace with your actual login route)
  };

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>;
  }

  return (
    <div>
      {/* Direct Navbar with Logout link */}
      <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          User Dashboard
        </Typography>
        <Link to={'/'} style={{color:'white'}}><Button color="inherit">Logout</Button></Link>
      </Toolbar>
    </AppBar>

      {/* Employee Table */}
      <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="employee table">
          <TableHead>
            <TableRow>
              <TableCell>Employee Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Designation</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Salary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No employees found.
                </TableCell>
              </TableRow>
            ) : (
              employees.map((employee) => (
                <TableRow
                  key={employee._id} // Ensure `_id` exists and is unique
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {employee.name}
                  </TableCell>
                  <TableCell align="right">{employee.email}</TableCell>
                  <TableCell align="right">{employee.designation}</TableCell>
                  <TableCell align="right">{employee.location}</TableCell>
                  <TableCell align="right">{employee.salary}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserDashboard;
