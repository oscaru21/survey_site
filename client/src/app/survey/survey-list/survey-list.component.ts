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

  constructor(public surveysService: SurveysService){}

  ngOnInit() {
    this.surveysService.getSurveys();
    this.surveysSub = this.surveysService.getSurveyUpdateListener().
    subscribe((surveys:Survey[])=>{
      this.surveys = surveys;
    });
  }

  onDelete(surveyId: string){
    this.surveysService.deleteSurvey(surveyId);
  }

  ngOnDestroy() {
    this.surveysSub.unsubscribe();
  }




}
