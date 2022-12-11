const express = require('express');
const Survey = require("../models/survey")
const Question = require("../models/question")
const Option = require("../models/option")
const Answer = require("../models/answer")
const router = express.Router();

router.post('', (req, res, next) => {

  let questions = req.body.question;
  let idQuestions = [];

  questions.forEach(element => {

    let idOptions = [];
    let options = element.options;

    options.forEach(optionElement => {

      var optionModel = new Option({
        position: optionElement.position,
        label: optionElement.label
      });

      optionModel.save();
      idOptions.push(optionModel._id);
    });

    var data = new Question({
      position: element.position,
      label: element.label,
      type: element.type,
      options: idOptions
    });
   data.save();
   idQuestions.push(data._id);
  });

 const survey = new Survey({
    creator: req.body.creator,
    title: req.body.title,
    expiredDate: req.body.expiredDate,
    description: req.body.description,
    questions: idQuestions
  });
  survey.save().then(createdSurvey =>{
    res.json({
      message: 'Survey added successfully',
      surveyId: createdSurvey._id,
    })
  });

})

router.get('',(req, res, next)=>{
  Survey.find().then(documents =>{
    res.status(200).json({
      message: 'Surveys fetched successfully',
      surveys: documents,
    });
   })
})

router.delete("/:id", (req, res, next)=>{
  Survey.deleteOne({_id: req.params.id}). then(result=>{
    console.log(result);
    res.status(200).json({
      message: 'Surveys deleted successfully'
    })
  })
})

router.get("/:id", (req, res, next)=>{
  Survey.findById(req.params.id)
  .populate(
    { path: 'questions',
      populate:{path: 'options'}
    })
  .exec(function(error, survey) {
    if(survey){
      res.status(200).json({
        message: 'Surveys fetched successfully',
        surveys: survey,
      });
    } else {
      res.status(404).json({message: 'Survey not found!!'})
    }
  })
})

router.post("/answer", (req, res, next)=>{
  var answer = new Answer({
    repondent: req.body.repondent,
    survey: req.body.survey,
    answers:  req.body.questions
  });
  answer.save().then(createdSurvey =>{
    res.json({
      message: 'Survey successfully Completed',
      answerResponse: createdSurvey,
    })
  });
})


router.get("/answer/:id", (req, res, next)=>{
  Answer.find({'survey':req.params.id})
  .exec(function(error, answer) {
    if(answer){
      res.status(200).json({
        message: 'Surveys fetched successfully',
        answer: answer,
      });
    } else {
      res.status(404).json({message: 'Survey not found!!'})
    }
  })
})



router.put("/:id", (req, res, next)=>{


  let questions = req.body.question;

  let idQuestions = [];

  questions.forEach(element => {

    let idOptions = [];
    let options = element.options;


    options.forEach(optionElement => {



      if(optionElement._id !== null && optionElement._id !== ''  && optionElement._id!==undefined){

        var optionModel = ({
          position: optionElement.position,
          label: optionElement.label
        });


        Option.updateOne({_id:optionElement._id},optionModel).then(result=>{
          console.log('update.... option update')
         });
         idOptions.push(optionElement._id);
      } else {

        var optionModel = new Option({
          position: optionElement.position,
          label: optionElement.label
        });
        optionModel.save();
        idOptions.push(optionModel._id);
      }

    });


    if(element._id !== null && element._id !== ''  && element._id!==undefined){

      var question =({
        position: element.position,
        label: element.label,
        type: element.type,
        options: idOptions
      });

      Question.updateOne({_id:element._id},question).then(result=>{
        console.log('update.... question')
       });
      idQuestions.push(element._id);
    } else {

      var data = new Question({
        position: element.position,
        label: element.label,
        type: element.type,
        options: idOptions
      });
     data.save();
     idQuestions.push(data._id);

    }

  })

  const survey = new Survey({
    _id: req.body._id,
    creator: req.body.creator,
    title: req.body.title,
    description: req.body.description,
    questions: idQuestions
  })
  Survey.updateOne({_id:req.params.id},survey).then(result=>{
    res.status(200).json({message:'Updated succesfully!'})
  })

});

module.exports = router;
