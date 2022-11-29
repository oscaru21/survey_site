import { Component, OnInit} from '@angular/core';
import { Survey } from '../../model/survey.model';
import { FormControl, AbstractControl, FormArray, FormBuilder, FormGroup, NgForm }  from '@angular/forms';
import { SurveysService } from '../surveys.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrls: ['./survey-create.component.css']
})
export class SurveyCreateComponent implements OnInit {
/*
  userForm: FormGroup;
  formControl:FormControl;

  constructor(public surveysService: SurveysService, public route: ActivatedRoute, private fb: FormBuilder){this.userForm = this.fb.group({
    name: [],
    questions: this.fb.array([
      this.fb.control(null)
    ])
  })};
*/
  constructor(public surveysService: SurveysService, public route: ActivatedRoute){};

  private mode ='create';
  private surveyId:string;
  survey:Survey;

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('surveyId')){
        this.mode = "edit";
        this.surveyId = paramMap.get('surveyId');
        this.surveysService.getSurvey(this.surveyId).subscribe(surveyData=>{
          this.survey = {_id: surveyData._id, creator:surveyData.creator, title: surveyData.title, description: surveyData.description, question_1: surveyData.question_1, question_2: surveyData.question_2, question_3: surveyData.question_3, question_4: surveyData.question_4, question_5: surveyData.question_5, question_6: surveyData.question_6, question_7: surveyData.question_7, question_8: surveyData.question_8, question_9: surveyData.question_9, question_10: surveyData.question_10}
        });
      } else {
        this.mode = "create";
        this.surveyId = null;
      }
    });
  }
/*
  addQuestion(): void {
    (this.userForm.get('questions') as FormArray).push(
      this.fb.control(null)
    );
  }

  removeQuestion(index) {
    (this.userForm.get('questions') as FormArray).removeAt(index);
  }

  getQuestionsFormControls(): AbstractControl[] {
    return (<FormArray> this.userForm.get('questions')).controls
  }
*/
  addCreator="";
  addTitle="";
  addDescription="";
  addQuestion_1="";
  addQuestion_2="";
  addQuestion_3="";
  addQuestion_4="";
  addQuestion_5="";
  addQuestion_6="";
  addQuestion_7="";
  addQuestion_8="";
  addQuestion_9="";
  addQuestion_10="";

  onSaveSurvey(form: NgForm){

    if(this.mode === "create"){
      this.surveysService.addSurvey(form.value.creator, form.value.title, form.value.description, form.value.question_1, form.value.question_2, form.value.question_3, form.value.question_4, form.value.question_5, form.value.question_6, form.value.question_7, form.value.question_8, form.value.question_9, form.value.question_10);
    } else {
      this.surveysService.updateSurvey(this.surveyId, form.value.creator, form.value.title, form.value.description, form.value.question_1, form.value.question_2, form.value.question_3, form.value.question_4, form.value.question_5, form.value.question_6, form.value.question_7, form.value.question_8, form.value.question_9, form.value.question_10);
    }
    form.resetForm();
  }
}
