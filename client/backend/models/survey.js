const mongoose = require('mongoose');

const surveySchema = mongoose.Schema({
  creator: {type: String},
  title: {type: String},
  description: {type: String}
});

module.exports = mongoose.model('Survey', surveySchema);
