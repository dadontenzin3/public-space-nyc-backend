// Dependencies 
const express = require('express');

// Initialize the App
const app = express();

// Configure Settings
require('dotenv').config();
const {PORT = 3001, DATABASE_URL} = process.env;

// Connect to MongoDB using Mongoose

// Mount Middleware

// Mount Routes
app.get('/', (req, res) => {
    res.send('Mounting Routes');
});

// Tell the App to Listen
app.listen(PORT, () => {
    console.log(`Express is listening on port: ${PORT}`);
});