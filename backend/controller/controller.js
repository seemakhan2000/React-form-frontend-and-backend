/*This file defines the functions that handle the logic for each route.
When a request is made to one of the routes defined in router.js, the corresponding function in controller.js is executed.*/
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const React = require("../models/schema.js");
const signup = require('../models/signupSchema.js');
const Login = require('../models/loginSchema.js');
const token = require("../middleware/token.js");

/*GET data from MongoDB
Fetches all documents from the React collection and returns them as JSON.*/
const getData = async (req, resp) => {
    let result = await React.find();
    resp.json(result);
};

/*POST data to MongoDB
Creates a new document in the React collection based on the request body data.*/
const postData = async (req, resp) => {
    const formData = req.body;
    const savedFormData = await React.create(formData);
    console.log("Received Form Data:", formData);
    resp.json({ message: 'Welcome to my form' });
};

/* DELETE data from MongoDB
deletes a document from the React collection based on the id parameter.*/
const deleteData = async (req, res) => {
    const id = req.params.id;
    const deletedData = await React.findByIdAndDelete(id);
    res.json({ message: 'Data deleted successfully', deletedData });
};

/*UPDATE data in MongoDB
Updates a document in the React collection based on the id parameter and request body data*/
const updateData = async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const updatedDocument = await React.findByIdAndUpdate(id, updatedData, { new: true });
    res.json({ message: 'Data updated successfully', updatedDocument });
};

/*login form
Authenticates a user based on email and password, returning a JWT token on successful login.*/
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Login.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

/*signupUser form
 Registers a new user, hashing the password and saving the user data in both signup and Login collections*/
const signupUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await signup.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new signup({
            name: name,
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        // Save the new user in the Login collection
        const newLoginUser = new Login({
            name: name,
            email: email,
            password: hashedPassword
        });

        await newLoginUser.save();

        res.status(201).json({ message: 'Signup data successfully' });
    } catch (error) {
        console.error("Error:", error.message);

        if (error.message.includes('bcrypt')) {
            return res.status(500).json({ message: 'Error hashing password' });
        }

        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Protected route handler
const protectedRoute = (req, res) => {
    res.send('Protected data');
};

module.exports = {
    getData,
    postData,
    deleteData,
    updateData,
    loginUser,
    signupUser,
    protectedRoute 
}