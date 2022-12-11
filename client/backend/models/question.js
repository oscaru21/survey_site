const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = mongoose.Schema({
  
    position: {type: mongoose.Schema.Types.Number},
    label: {type: String},
    type: {type: String},
    options: [{
        type: Schema.Types.ObjectId,
        ref: "option"
    }],
    answer: [{
        type: Schema.Types.ObjectId,
        ref: "answer"
    }]
    
});

module.exports = mongoose.model('question', questionSchema);
