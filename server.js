// Dependencies 
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const parkRouter = require('./controllers/parks');
const serviceAccount = require('./firebase-private-key.json');
const admin = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth')

// Initialize the App
const app = express();

// Configure Settings
require('dotenv').config();
const {PORT = 3001, DATABASE_URL} = process.env;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

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

//authorization middleware
app.use(async function(req, res, next) {
    try {
        const token = req.get('Authorization');
        if(token){
            const user = await getAuth().verifyIdToken(token.replace('Bearer ', ''));
            req.user = user;   
        } else {
            req.user = null;
        }
    } catch (error) {
        req.user = null;
    }
    next();
});

function isAuthenticated(req, res, next) {
    if(req.user) return next();
        res.status(401).json({message: 'login first'});
};



// Mount Routes
app.get('/', (req, res) => {
    res.send('Mounting Routes');
});

app.use('/api/myparks', isAuthenticated, parkRouter);

app.get('/*', (req, res) => {
    res.status(404).json({message: 'not found'})
});

// Tell the App to Listen
app.listen(PORT, () => {
    console.log(`Express is listening on port: ${PORT}`);
});