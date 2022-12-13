import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Survey } from '../../model/survey.model'
import { SurveysService } from '../surveys.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit, OnDestroy {
  surveys:Survey[] =[];
  user: User;
  private surveysSub: Subscription;

  constructor(public surveysService: SurveysService){}

  ngOnInit() {
    this.surveysService.getSurveys();
    this.user = JSON.parse(localStorage.getItem('user'));
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

  isDisabled(expirtionDate: Date){
    const now = new Date();
    let expiredDate = new Date(expirtionDate);
    let isDisabled : boolean = false;
    if(expiredDate.getTime() < now.getTime()) {
      isDisabled = true;
    }
    return isDisabled;
  }

  isCreator(creator: String){
    let isCreator : boolean = false;
    if(creator == this.user.username) {
      isCreator = true;
    }
    return isCreator;
  }
}
