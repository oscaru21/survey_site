let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//create reference to the model (dbschema)
let Contact = require("../models/contact");

module.exports.displayContactList = (req, res, next) => {
  Contact.find({}).sort({name: 1}).exec((err, contactList) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("contact/list", {
        title: "Business Contact",
        ContactList: contactList,
        displayName: req.user ? req.user.displayName : "",
      });
      //render contact.ejs and pass title and Contactlist variable we are passing contactList object to ContactList property
    }
  });
};

module.exports.addpage = (req, res, next) => {
  res.render("contact/add", {
    title: "Add Contact",
    displayName: req.user ? req.user.displayName : "",
  });
};

module.exports.addprocesspage = (req, res, next) => {
  let newContact = Contact({
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
  });
  Contact.create(newContact, (err, Contact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the contact list
      res.redirect("/business-contact");
    }
  });
};

module.exports.displayeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  Contact.findById(id, (err, contacttoedit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("contact/edit", {
        title: "Update Contact",
        contact: contacttoedit,
        displayName: req.user ? req.user.displayName : "",
      });
    }
  });
};

module.exports.processingeditpage = (req, res, next) => {
  let id = req.params.id; //id of actual object

  let updatecontact = Contact({
    _id: id,
    name: req.body.name,
    number: req.body.number,
    email: req.body.email,
  });
  Contact.updateOne({ _id: id }, updatecontact, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh the contact list
      res.redirect("/business-contact");
    }
  });
};

module.exports.deletepage = (req, res, next) => {
  let id = req.params.id;
  Contact.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //refresh contact list
      res.redirect("/business-contact");
    }
  });
};
