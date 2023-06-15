// Dependencies 
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const parkRouter = require('./controllers/parks');

// Initialize the App
const app = express();

// Configure Settings
require('dotenv').config();
const {PORT = 3001, DATABASE_URL} = process.env;

// Connect to MongoDB using Mongoose
mongoose.connect(DATABASE_URL); 
mongoose.connection
.on('open', () => console.log('Connected to MongoDB'))
.on('close', () => console.log('Disconnected to MongoDB'))
.on('error', (error) => console.log(`MongoDB Error: ${ error.message }`));

// Mount Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Mount Routes
app.get('/', (req, res) => {
    res.send('Mounting Routes');
});

app.use('/api/myparks', parkRouter);

app.get('/*', (req, res) => {
    res.status(404).json({message: 'not found'})
});

// Tell the App to Listen
app.listen(PORT, () => {
    console.log(`Express is listening on port: ${PORT}`);
});