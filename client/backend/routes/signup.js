const express = require('express');
const Signup = require("../models/signup")
const router = express.Router();

router.post('', (req, res, next) => {
  const profile = new Signup({
    email: req.body.email,
    username: req.body.username,
    gender: req.body.gender,
    age:req.body.age,
    password:req.body.password,
    confirm_password:req.body.confirm_password
  });
  profile.save().then(createdProfile =>{
    res.json({
      message: 'Profile created successfully',
      pfofileID: createdProfile._id,
    })
  });

});
module.exports = router;
