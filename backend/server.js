/*This is the main entry point of my application.
It sets up the Express application, middleware, and connects to MongoDB using connectDB().
It imports and uses the router (router.js) for handling API routes.
Sets up the Express app.
Connects to MongoDB via connectDB() from connectMongoDB/db.js.
Imports and sets up the router (router.js) for handling API routes.
*/
require('dotenv').config();
 //Imports the Express framework.
const express = require('express');
//Imports CORS middleware to handle cross-origin requests
const cors = require('cors');
//Imports the router defined in router.js
const router = require('./router/router.js'); 
//Imports the function to connect to MongoDB.
const connectDB = require('./connectMongoDB/db.js'); 
//Creates an Express application instance.
const app = express();
const port = process.env.PORT || 7001;

app.use(cors());
 // Enable CORS for all routes
 app.use(express.json());  // Parse incoming JSON requests

// Use your router for all API requests
app.use('/api', router);

// Connect to MongoDB
connectDB()
// Start the server
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
