/*Imported and used in server.js with app.use('/api', router).
Defines the routes and associates them with controller functions from controller.js.
router.js defines the routes and associates them with controller functions from controller.js*/
const express = require('express');
const router = express.Router();
const fetchData = require('../controller/controller.js');
const { verifyToken } = require('../middleware/token.js');

// GET request handler
router.get("/get", fetchData.getData);//Handles GET requests to /api/get by calling getData function from controller.js

// POST request handler
router.post("/", fetchData.postData);

// DELETE request handler
router.delete('/delete/:id', fetchData.deleteData);

// PUT request handler
router.put('/update/:id', fetchData.updateData);

// login route
router.post('/login', fetchData.loginUser);

// registration route
router.post('/signup', fetchData.signupUser);

// Protected route
/*Handles GET requests to /api/protected, requiring a valid token using verifyToken middleware, 
and calls protectedRoute function from controller.js.*/
router.get('/protected', verifyToken, fetchData.protectedRoute);

module.exports = router;
