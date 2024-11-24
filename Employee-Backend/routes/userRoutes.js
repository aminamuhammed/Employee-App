// userRoutes.js or wherever your login route is defined
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../model/userData.js');
const router = express.Router();
router.use(express.json());  // Ensure this middleware is added

// Signup route
router.post('/signup', async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the provided data
    const newUser = new UserModel({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role || 'user', // Default to 'user' if no role is provided
    });

    // Save the new user
    await newUser.save();

    // Generate a token for the new user
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token and user info in the response
    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login route
// Route for login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;



