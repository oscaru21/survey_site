import { Component, OnInit} from '@angular/core';
import { Survey } from '../../model/survey.model';
import { NgForm }  from '@angular/forms';
import { SurveyService } from '../../service/Survey';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-survey-create',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  constructor(public surveyService: SurveyService, public route: ActivatedRoute){};

  private mode ='create';
  private surveyId!:string;
  survey!:Survey;

  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('surveyId')){
        this.mode = "edit";
        this.surveyId = paramMap.get('surveyId')!;
        this.surveyService['getSurvey'](this.surveyId).subscribe((surveyData: { _id: any; creator: any; title: any; description: any; })=>{
          this.survey = {_id: surveyData._id, creator:surveyData.creator, title: surveyData.title, description: surveyData.description}
        });
      } else {
        this.mode = "create";
        this.surveyId = null!;
      }
    });
  }

  addCreator="";
  addTitle="";
  addDescription="";


  onSaveSurvey(form: NgForm){

    if(this.mode === "create"){
      this.surveyService['addSurvey'](form.value.creator, form.value.title, form.value.description);
    } else {
      this.surveyService['updateSurvey'](this.surveyId, form.value.creator, form.value.title, form.value.description);
    }
    form.resetForm();
  }
}
