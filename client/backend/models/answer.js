const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const answerSchema = mongoose.Schema({
  repondent: {type: String},
  answer: [String],
  survey: {
          type: Schema.Types.ObjectId, 
          ref:"survey"
        },
  questions: [{
    type: Schema.Types.ObjectId,
    ref: "question"
}]
});

module.exports = mongoose.model('Answer', answerSchema);
