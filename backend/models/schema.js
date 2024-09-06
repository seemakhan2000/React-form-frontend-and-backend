const mongoose = require("mongoose");
/*Defines the structure of documents in the React collection with fields username, email, phone, and password*/
const userSchema = new mongoose.Schema({
  username: {
    type: "string",
    require: true,
  },

  email: {
    type: String,
    require: true,
  },

  phone: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },
});

//define module or connection name
/*Creates a model named React based on userSchema.*/
const React = new mongoose.model("React", userSchema)
module.exports =React;

