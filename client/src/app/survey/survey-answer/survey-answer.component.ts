import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SurveysService } from '../surveys.service';
import { Question } from 'src/app/model/question.model';
import { Option } from 'src/app/model/option.model';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Survey } from 'src/app/model/survey.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioButton, MatRadioChange, MatRadioGroup } from '@angular/material/radio';
import { throwIfEmpty } from 'rxjs';

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
  mapOptionSelected = new Map<string, string[]>();

  constructor( public route: ActivatedRoute,  public surveysService: SurveysService, private fb:FormBuilder) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap: ParamMap)=>{

      this.surveysService.getSurvey(paramMap.get('surveyId')).subscribe( (data) => {
        this.surveyModel =  new Survey(
          data['surveys']._id,
          data['surveys'].creator,
          data['surveys'].title,
          data['surveys'].expiredDate,
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
    const json = JSON.stringify(Object.fromEntries(this.mapOptionSelected));
    this.surveysService.answerSurvey(this.surveyResponder.value,this.surveyModel._id, json);
   }


   onCheck(ob: MatCheckboxChange, value: string, questionId: string) {
    console.log(" checked: " + ob.checked + " Question id : "+ questionId + "value : "+ value);
    const deleteCount = 1;
    if(!this.mapOptionSelected.has(questionId)){
      const array: string[] = [];
      array.push(value);
      this.mapOptionSelected.set(questionId,array);
    } else {
        let array = this.mapOptionSelected.get(questionId);
        if(array.includes(value)) {
          array.splice(array.indexOf(value), deleteCount);
          if(array.length == 0){ this.mapOptionSelected.delete(questionId);}
        } else {
          array.push(value);
        }
    }
    
  }

  onCheckRadio($event: MatRadioChange,value: string ,questionId: string){

    if(this.mapOptionSelected.has(questionId)) {
      this.mapOptionSelected.delete(questionId);
    } else {
      const array: string[] = [value];
      this.mapOptionSelected.set(questionId,array);
    }
  }

  }

