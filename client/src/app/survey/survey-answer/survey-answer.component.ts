import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SurveysService } from '../surveys.service';
import { Question } from 'src/app/model/question.model';
import { Option } from 'src/app/model/option.model';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Survey } from 'src/app/model/survey.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioButton, MatRadioChange, MatRadioGroup } from '@angular/material/radio';

@Component({
  selector: 'app-survey-answer',
  templateUrl: './survey-answer.component.html',
  styleUrls: ['./survey-answer.component.css']
})
export class SurveyAnswerComponent implements OnInit {

  surveyResponder: FormControl;
  surveyForm: FormGroup;
  surveyModel: Survey;
  fields = [];
  mapCheckBox = new Map<string, string[]>();
  mapRadioButton = new Map<String,string>();

  constructor( public route: ActivatedRoute,  public surveysService: SurveysService, private fb:FormBuilder) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap: ParamMap)=>{

      this.surveysService.getSurvey(paramMap.get('surveyId')).subscribe( (data) => { 
        this.surveyModel =  new Survey(
          data['surveys']._id,
          data['surveys'].creator,
          data['surveys'].title,
          data['surveys'].description,
          data['surveys'].questions);

          this.buildSurvey();

          this.surveyResponder = new FormControl('');
          this.surveyForm.addControl("surveyResponder", this.surveyResponder);
          
          this.surveyModel.question.forEach(question =>{ 
              this.surveyForm.addControl(""+question._id, new FormControl(''));
              this.fields.push(question._id);
          })
         

      });

     

    });

   
   
  }


  buildSurvey() {
    this.surveyForm = new FormGroup({
      questions: this.fb.array(this.getQuestionFormGroup(this.surveyModel.question)) ,
    });
  }

  getQuestionFormGroup(question: Question[]) { 
    let listQuestions = [];
    question.forEach(question => {
      
      let questionForm =  this.fb.group({
        _id:new FormControl(question._id),
        position: new FormControl(question.position),
        label: new FormControl(question.label),
        type: new FormControl(question.type),
        options: this.fb.array(this.getOptionFormGroup(question.options))
      });
      listQuestions.push(questionForm);
    });
   
    console.log(listQuestions);

    return listQuestions;
  }


  getOptionFormGroup(option: Option[]) { 
    let listOption = [];
   
    option.forEach(option=>{
      let optionForm = this.fb.group({
        formGroupFields:new FormControl(option._id),
        position: new FormControl(option.position),
        label: new FormControl(option.label),
      });
      listOption.push(optionForm);
    });
    return listOption;
  }


  getFormControlsFields() {
    const formGroupFields = {};
    this.surveyModel.question.forEach(question=>{
      for (const field of Object.keys(question)) {
        formGroupFields[field] = new FormControl('');
        this.fields.push(field);
      }
    });
  
    return formGroupFields;
  }



  getQuestions() : FormArray{
    return this.surveyForm.get('questions') as FormArray;
   }

   getOptions(i) : FormArray{
    const control = this.getQuestions().controls[i];
    let options = control.get('options') as FormArray ;
    return options;
   }


   onSubmit() {  


    const answer: string[] = [];

     this.fields.forEach(element => {
       
         let SurveyId = this.surveyModel._id; 

         console.log(this.mapCheckBox.get(element))

         if(this.mapCheckBox.has(element)) {
          let arrayCheckBox = this.mapCheckBox.get(element);
          arrayCheckBox.forEach(element =>{
             answer.push(element);
          });
         }
       

         let radioButtonValueByElement = this.mapRadioButton.get(element);
          if(radioButtonValueByElement != null){
            answer.push(element);
          }

          if(this.surveyForm.get(element).value != null) {
            
            answer.push(this.surveyForm.get(element).value);
         }
       
        console.log(element);
        this.surveysService.answerSurvey(this.surveyResponder.value,SurveyId, answer,this.fields);
     });
   }


   onCheck(ob: MatCheckboxChange, value: string, questionId: string) {
    console.log(" checked: " + ob.checked + " Question id : "+ questionId + "value : "+ value);
    if(this.mapCheckBox.has(questionId)) {
      let array = this.mapCheckBox.get(questionId);
      console.log(ob.checked);
      if(ob.checked == true){
       
   
        array.push(value);
      
      } else {

        const startIndex = array.indexOf(value);
        const deleteCount = 1;

        if (startIndex !== -1) {
          array.splice(startIndex, deleteCount);
        } 
       
      if(array.length == 0){
        this.mapCheckBox.delete(questionId);
      }

    }
      
    } else {
      const array: string[] = [];
      array.push(value);
      this.mapCheckBox.set(questionId,array);
    }

    console.log(this.mapCheckBox);
   
  } 

  onCheckRadio($event: MatRadioChange, questionId: string){
   
    if(this.mapRadioButton.has(questionId)) {
      this.mapRadioButton.delete(questionId);
    } else {
      this.mapRadioButton.set(questionId,$event.value);
    }
    console.log(this.mapRadioButton);
  }

  }

