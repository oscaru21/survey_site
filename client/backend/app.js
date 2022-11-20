const express = require('express');
const bodyParser = require('body-parser')
// const cors = require('cors');
const app = express();

const Survey = require('./models/survey');
const { default: mongoose } = require('mongoose');
// const survey = require('./models/survey');

const surveyRoutes = require('./routes/surveys')

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

mongoose.connect("mongodb+srv://barbarians:kZCej5oI6AeLWv0Q@cluster0.v8utvo3.mongodb.net/Surveyweb?retryWrites=true&w=majority")
  .then(()=>{
      console.log('Connected to database')})
  .catch(()=>{
      console.log('Connected unsuccessfully')
  })

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


  app.use("/survey",surveyRoutes);

  module.exports = app;
