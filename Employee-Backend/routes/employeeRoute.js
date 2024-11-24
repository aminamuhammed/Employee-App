const express = require('express');
const EmployeeModel = require('../model/employeeData'); // Assuming this is your Employee model
const { authenticate, authorizeAdmin } = require('../middleware/auth'); // Import middleware functions
const router = express.Router();

router.get('/employee', authenticate, async (req, res) => {
  try {
    const employees = await EmployeeModel.find();
    res.status(200).json(employees);  // Return the list of employees
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching employees' });
  }
});

router.post('/createemployee', authenticate, authorizeAdmin, async (req, res) => {
  const { name, email, designation, location, salary } = req.body;

  try {
    const newEmployee = new EmployeeModel({ name, email, designation, location, salary });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: 'Error creating employee' });
  }
});

router.put('/updateemployee/:id', authenticate, authorizeAdmin, async (req, res) => {
  const { name, email, designation, location, salary } = req.body;

  try {
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      req.params.id,
      { name, email, designation, location, salary },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee updated successfully', updatedEmployee });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error during update' });
  }
});

router.delete('/deleteemployee/:id', authenticate, authorizeAdmin, async (req, res) => {
  try {
    const deletedEmployee = await EmployeeModel.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting employee' });
  }
});

module.exports = router;

