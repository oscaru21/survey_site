import { Component, OnInit} from '@angular/core';
import { Survey } from '../../model/survey.model';
import { NgForm }  from '@angular/forms';
import { SurveysService } from '../surveys.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey-create.component.html',
  styleUrls: ['./survey-create.component.css']
})
export class SurveyCreateComponent implements OnInit {

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
          this.survey = {_id: surveyData._id, creator:surveyData.creator, title: surveyData.title, description: surveyData.description}
        });
      } else {
        this.mode = "create";
        this.surveyId = null;
      }
    });
  }

  addCreator="";
  addTitle="";
  addDescription="";


  onSaveSurvey(form: NgForm){

    if(this.mode === "create"){
      this.surveysService.addSurvey(form.value.creator, form.value.title, form.value.description);
    } else {
      this.surveysService.updateSurvey(this.surveyId, form.value.creator, form.value.title, form.value.description);
    }
    form.resetForm();
  }
}
