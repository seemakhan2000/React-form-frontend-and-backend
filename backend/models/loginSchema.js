const mongoose = require('mongoose');
// Login Schema
const loginSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
// Create a model for the login schema
const Login = mongoose.model('Login', loginSchema);

module.exports =  Login;
