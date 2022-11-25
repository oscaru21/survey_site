let express = require('express');
let passport = require('passport');

// enable jwt
let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        // server err?
        if(err)
        {
            return next(err);
        }
        // is there a user login error?
        if(!user)
        {
            console.log("Authentication  error");
            return res.json({success: false, msg: 'Incorrect username or password'})
        }
        req.login(user, (err) => {
            // server error?
            if(err)
            {
                return next(err);
            }

            const payload = 
            {
                id: user._id,
                username: user.username,
                email: user.email
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 // 1 week
            });
            
            return res.json({success: true, msg: 'User Logged in Successfully!', user: {
                id: user._id,
                username: user.username,
                email: user.email
            }, token: authToken});
        });
    })(req, res, next);
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.password
        email: req.body.email,
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                return res.json({success: false, msg: 'User Already exist!'});
            }
        }
        else
        {
            // if no error exists, then registration is successful
            const payload = 
            {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }

            const authToken = jwt.sign(payload, DB.Secret, {
                expiresIn: 604800 // 1 week
            });
            
            return res.json({success: true, msg: 'User Logged in Successfully!', user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            }, token: authToken});
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.json({success: true, msg: 'User Successfully Logged out!'});
}