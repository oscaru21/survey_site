let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    //Vinh will insert the survey schema fields here
},
{
    collection: "surveys"
});

module.exports = mongoose.model('Survey', surveyModel);