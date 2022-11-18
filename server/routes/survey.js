let express = require('express');
let router = express.Router();

let surveyController = require("../controllers/survey");

router.post('', surveyController.save);
  
  router.get('',surveyController.findAll);
  
  router.delete("/:id", surveyController.delete);
  
  router.get("/:id", surveyController.findById)
  
  router.put("/:id", surveyController.update);


module.exports = router;