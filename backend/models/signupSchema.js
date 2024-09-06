const mongoose = require("mongoose");
const signupSchema = new mongoose.Schema({
  username: {
    type: "string",
    require: true,
  },

  email: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },
});

//define module or connection name
const  signup = new mongoose.model("signup", signupSchema)
module.exports =signup;

