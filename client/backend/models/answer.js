const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const answerSchema = mongoose.Schema({
  repondent: {type: String},
  survey: {type: Schema.Types.ObjectId, ref:"survey"},
  answers: {type: Schema.Types.String},
});

module.exports = mongoose.model('Answer', answerSchema);
