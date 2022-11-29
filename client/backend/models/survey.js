const mongoose = require('mongoose');

const surveySchema = mongoose.Schema({
  creator: {type: String},
  title: {type: String},
  description: {type: String},
  question_1: {type: String},
  question_2: {type: String},
  question_3: {type: String},
  question_4: {type: String},
  question_5: {type: String},
  question_6: {type: String},
  question_7: {type: String},
  question_8: {type: String},
  question_9: {type: String},
  question_10: {type: String}
});

module.exports = mongoose.model('Survey', surveySchema);
