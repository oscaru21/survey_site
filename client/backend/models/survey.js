const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const surveySchema = mongoose.Schema({
  creator: {type: String},
  title: {type: String},
  description: {type: String},
  questions: [{
    type: Schema.Types.ObjectId,
    ref: "question"
}]
});

module.exports = mongoose.model('Survey', surveySchema);
