import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Survey } from '../../model/survey.model'
import { SurveysService } from '../surveys.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit, OnDestroy {
  surveys:Survey[] =[];
  private surveysSub: Subscription;
  Date_check = Date.now();
  constructor(public surveysService: SurveysService){}

  ngOnInit() {
    this.Date_check = Date.now();
    this.surveysService.getSurveys();
    this.surveysSub = this.surveysService.getSurveyUpdateListener().
    subscribe((surveys:Survey[])=>{
      this.surveys = surveys;
    });
  }


  getExpiredDate(date:Date){
    const expireDateConvert = new Date(date).getTime();
    return expireDateConvert;
  }

  handleComparedate(date:Date){
    const expireDateConvert = new Date(date).getTime();
    const nowDate = Date.now();
    if(expireDateConvert>nowDate){
      return false;
    } else {
      return true;
    }
  }

  onDelete(surveyId: string){
    this.surveysService.deleteSurvey(surveyId);
  }

  ngOnDestroy() {
    this.surveysSub.unsubscribe();
  }
}
