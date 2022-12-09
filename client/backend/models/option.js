const mongoose = require('mongoose');

const optionSchema = mongoose.Schema({
  
    position: {type: mongoose.Schema.Types.Number},
    label: {type: String},
});

module.exports = mongoose.model('option', optionSchema);
