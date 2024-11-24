const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db/connection'); // Ensure DB connection is successful

const useRoutes = require('./routes/userRoutes');
const empRoutes = require('./routes/employeeRoute');

const app = express();

//for deployment
const path = require('path')
app.use(express.static(path.join(__dirname,'/build')))

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body

app.get('/test', (req, res) => {
  res.send('Backend is working');
});


// Routes
app.use('/user', useRoutes);
app.use('/emp', empRoutes);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});


app.get('/*',function(req,res){res.sendFile(path.join(__dirname,'/build/index.html')); });

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

