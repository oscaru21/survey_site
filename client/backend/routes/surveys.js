const express = require('express');
const Survey = require("../models/survey")
const router = express.Router();

router.post('', (req, res, next) => {
  const survey = new Survey({
    creator: req.body.creator,
    title: req.body.title,
    description: req.body.description,
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
  Survey.findById(req.params.id).then(survey=>{
    if(survey){
      res.status(200).json(survey);
    } else {
      res.status(404).json({message: 'Survey not found!!'})
    }
  })
})

router.put("/:id", (req, res, next)=>{
  const survey = new Survey({
    _id: req.body._id,
    creator: req.body.creator,
    title: req.body.title,
    description: req.body.description,
  })
  Survey.updateOne({_id:req.params.id},survey).then(result=>{
    res.status(200).json({message:'Updated succesfully!'})
  })
});

module.exports = router;
