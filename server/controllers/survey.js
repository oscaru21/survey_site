let express = require('express');

module.exports.displaySurveyList = (req, res, next) => {
    res.send('Surveys')
}