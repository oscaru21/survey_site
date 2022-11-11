let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create a model class
let contactModel = mongoose.Schema(
  {
    name: String,
    number: String,
    email: String,
  },

  {
    collection: "business_contact",
  }
);

//contactsmodel to create new contact more powerful than just class
module.exports = mongoose.model("Contact", contactModel);
