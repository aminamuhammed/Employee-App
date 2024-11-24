import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Button, Paper, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please log in.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/emp/employee", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(response.data);
    } catch (err) {
      setError("Failed to fetch employees.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleUpdate = (employee) => {
    // Navigate to the edit page with the employee data
    navigate("/addemp", { state: { employee } });
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/emp/deleteemployee/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(employees.filter((employee) => employee._id !== id));
      alert("Employee deleted successfully.")
    } catch (err) {
      console.error(err);
      alert('Failed to delete employee')
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: "", severity: "" });
  };

  if (isLoading) {
    return <CircularProgress style={{ margin: "auto", display: "block" }} />;
  }

  return (
    <div>
      {error && <Alert severity="error" style={{ marginBottom: "16px" }}>{error}</Alert>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell  style={{ fontWeight: 'bold', fontSize: '18px' }}>Employee Name</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '18px' }}>Email</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '18px' }}>Designation</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '18px' }}>Location</TableCell>
              <TableCell style={{ fontWeight: 'bold', fontSize: '18px' }}>Salary</TableCell>
              <TableCell align='center' style={{ fontWeight: 'bold', fontSize: '18px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.location}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleUpdate(employee)}
                    style={{ marginRight: "8px" }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AdminDashboard;
