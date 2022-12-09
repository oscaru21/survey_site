import { Component, OnInit} from '@angular/core';
import { Survey } from '../../model/survey.model';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms' ;
import { SurveysService } from '../surveys.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddAnswerDialogComponent} from '../add-answer-dialog/add-answer-dialog.component';
import { Question } from 'src/app/model/question.model';
import { Option } from 'src/app/model/option.model';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrls: ['./survey-create.component.css']
})
export class SurveyCreateComponent implements OnInit {

  survey: FormGroup;
  private mode ='create';
  private surveyId:string;
  surveyModel:Survey;
  constructor(private matDialog:MatDialog,  private fb:FormBuilder, public surveysService: SurveysService, public route: ActivatedRoute) {

  }

  ngOnInit() {
    this.onInit();
  }

  onInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('surveyId')){
        this.mode = "edit";
        this.surveyId = paramMap.get('surveyId'); 
        
        this.surveysService.getSurvey(this.surveyId).subscribe(
          (data)=>{
          this.surveyModel = {  
              _id:data['surveys']._id,
              creator:data['surveys'].creator,
              title:data['surveys'].title,
              description:data['surveys'].description,
              question:data['surveys'].questions
            }
        
          this.buildSurvey( this.surveyModel);
        });
      } else {
        this.mode = "create";
        this.initSurvey();
      }
    });
  }

  buildSurvey(surveyModel: Survey){
    this.survey = new FormGroup({
      creator: new FormControl(surveyModel.creator),
      title: new FormControl(surveyModel.title),
      description: new FormControl(surveyModel.description),
      questions: this.fb.array([]) ,
    });
    

    const control = <FormArray>this.survey.get('questions');

     surveyModel.question.forEach(item=>{
        control.push(this.getQuestionFormGroup(item));
     });
   
  }

  getQuestionFormGroup(question: Question) {
    const questionForm =  this.fb.group({
      _id:[question._id],
      questionNumber: [question.position],
      questionLabel: [question.label],
      questionType: [question.type],
      options: this.fb.array(this.getOptionFormGroup(question.options))
    });

    return questionForm;
  }




  getOptionFormGroup(option: Option[]) {
    let listOption = [];
    option.forEach(option=>{
      let optionForm =  this.fb.group({
        _id:[option._id],
        optionNumber: [option.position],
        optionTitle: [option.label],
      });
      listOption.push(optionForm);
    });
  
    return listOption;
  }



  initSurvey(){
    this.survey = new FormGroup({
      creator: new FormControl(''),
      title: new FormControl(''),
      description: new FormControl(''),
      questions: this.fb.array([]) ,
    });
  }


  initQuestion(sequence) {
    const questionForm =  this.fb.group({
      _id:[''],
      questionNumber: [sequence],
      questionLabel: [''],
      questionType: [''],
      options:  this.fb.array([])
    });

    return questionForm;

  }


  initOptions() {
    let optionForm =  this.fb.group({
      _id:[''],
      optionNumber: [''],
      optionTitle: [''],
    });

    return optionForm;
  }

  addQuestion() {
    const control = <FormArray>this.survey.get('questions');
    const sequence =  (control as FormArray).length ;
    control.push(this.initQuestion(sequence));
  }

  addOptions(i) {

    const control = (<FormArray>this.survey.get('questions')).controls[i].get('options');
    (control as FormArray).push(this.initOptions());
  }

  getQuestions(form) {
     return form.controls.questions.controls;
   }

   getOptions(i) : FormArray{
    const control = this.questions.controls[i];
    let options = control.get('options') as FormArray ;
    return options;
   }

   removeQuestion(i){
    const control = <FormArray>this.survey.get('questions');
    control.removeAt(i);
   }

   removeOptions(i,j){
    const control = this.questions.controls[i];
    let options = control.get('options') as FormArray ;
    options.removeAt(j);
    options.controls = [];
  }


  showDialog(i){
    const mdConfig = new MatDialogConfig();
 
    mdConfig.disableClose = true;
    mdConfig.autoFocus = true;
    mdConfig.width = "500px";
    mdConfig.hasBackdrop = false;

    mdConfig.data = {option: ''};

    let dialogo = this.matDialog.open(AddAnswerDialogComponent,mdConfig);

    dialogo.afterClosed().subscribe(data => {

     const control = this.questions.controls[i];

     const optios = control.get('options') as FormArray ;

     let optionForm =  this.fb.group({
      optionNumber: [optios.length+1],
      optionTitle: [data.option],
    });

     optios.push(optionForm);
          
    });

  }

  get questions(): FormArray {
    return this.survey.get('questions') as FormArray;
  }

  onSubmit() {  
 
   let questionsControl = <FormArray> this.survey.get('questions');

   // create Survey object 
   let questions: Question[] = [];

   questionsControl.controls.forEach(element => {
    let id: null;
    if(this.mode === "edit" && element.get('_id') != null) {
      id = element.get('_id').value;
    }
   
    let number = element.get('questionNumber').value;
    let label = element.get('questionLabel').value;
    let type = element.get('questionType').value;
    let option : Option[] =   this.getOptionsArray(element); 

    let question = new Question(id,number,label,type,option);
    questions.push(question);
    
   });

  

   let creator = this.survey.controls['creator'].value;
   let title = this.survey.controls['title'].value;
   let description = this.survey.controls['description'].value;

   if(this.mode === "create"){
    this.surveysService.addSurvey(creator,title, description,questions)
   } else {
    this.surveysService.updateSurvey(this.surveyModel._id,creator,title, description,questions)
   }
   
  }

  getOptionsArray(element){
    let option: Option[] = [];
    let id: null;
    element.controls.options.controls.forEach(element => {
      if(this.mode === "edit" && element.controls._id != null) {
         id = element.controls._id.value;
      }
      option.push(new Option(id,element.controls.optionNumber.value,element.controls.optionTitle.value));
    });
    return option;

  }
  
}
