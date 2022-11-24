let createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser')
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
// const cors = require('cors');

//modules used for authentication
let session = require('express-session');
let passport = require('passport');

let passportJWT = require('passport-jwt');
let JWTStrategy = passportJWT.Strategy;
let ExtractJWT = passportJWT.ExtractJwt;

let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require ('connect-flash');

//database setup
const { default: mongoose } = require('mongoose');
let DB = require('./config/db');

mongoose.connect(DB.URI)
  .then(()=>{
      console.log('Connected to database')})
  .catch(()=>{
      console.log('Connected unsuccessfully')
  })


const Survey = require('./models/survey');
// const survey = require('./models/survey');

let indexRouter = require('./routes/index');
const surveyRoutes = require('./routes/surveys')

const app = express();

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));



  // CORS connection
      app.use((req, res, next) => {
        res.setHeader(
          'Access-Control-Allow-Origin', '*'
        );
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept'
        );
        res.setHeader(
          'Access-Control-Allow-Methods',
          'GET, POST, PATCH, PUT, DELETE, OPTIONS'
        );
        next();
      });

  //setup of express session
  app.use(session({
    secret: "SomeSecret",
    saveUninitialized: false,
    resave: false
  }));

  // initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// passport user configuration

// create a User Model Instance
let userModel = require('./models/user');
let User = userModel.User;

// implement a User Authentication Strategy
passport.use(User.createStrategy());

// serialize and deserialize the User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = DB.Secret;

let strategy = new JWTStrategy(jwtOptions, (jwt_payload, done) => {
  User.findById(jwt_payload.id)
    .then(user => {
      return done(null, user);
    })
    .catch(err => {
      return done(err, false);
    });
});

passport.use(strategy);

//routing    
app.use("/survey",surveyRoutes);
//TODO: confirm with Oscar about endpoint
app.use("/", indexRouter);

module.exports = app;
