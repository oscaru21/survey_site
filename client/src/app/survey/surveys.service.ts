import { createPlatform, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Survey } from '../model/survey.model';

@Injectable({providedIn: 'root'})

export class SurveysService {
  private surveys: Survey[] = [];
  private surveysUpdated = new Subject<Survey[]>();

  constructor(private http: HttpClient, private router:Router){}

  getSurveys(){
    this.http.get<{message:string, surveys:Survey[]}>('http://localhost:3000/survey').subscribe((surveyData)=>{
      this.surveys = surveyData.surveys;
      this.surveysUpdated.next([...this.surveys]);
    });
  }

  getSurveyUpdateListener(){
    return this.surveysUpdated.asObservable();
  }

  addSurvey(creator:string, title:string, description:string){
    const survey:Survey = { _id: null, creator: creator, title: title, description:description};
    this.http.post<{message:string,surveyId: string}>('http://localhost:3000/survey', survey).subscribe((responseData)=>{
      const surveyId = responseData.surveyId;
      survey._id = surveyId;
      this.surveys.push(survey);
      this.surveysUpdated.next([...this.surveys])
      this.router.navigate(['/list']);
    });
  }

  deleteSurvey(surveyId:string){
    this.http.delete('http://localhost:3000/survey/' + surveyId)
    .subscribe(()=>{
      const updatedSurveys = this.surveys.filter(survey => survey._id !== surveyId);
      this.surveys = updatedSurveys;
      this.surveysUpdated.next([...this.surveys]);
    });
  }

  getSurvey(id:string){
    return this.http.get<{_id:string, creator:string, title:string, description:string}>('http://localhost:3000/survey/' + id);
  }

  updateSurvey(id:string, creator: string, title: string, description: string){
    const survey: Survey = {_id: id, creator:creator, title: title, description: description};
    this.http.put('http://localhost:3000/survey/' + id, survey).
    subscribe(response =>{
      const updatedSurveys = [...this.surveys];
      const oldSurveyIndex = updatedSurveys.findIndex(survey => survey._id === survey._id);
      updatedSurveys[oldSurveyIndex] = survey;
      this.surveys = updatedSurveys;
      this.surveysUpdated.next([...this.surveys]);
      this.router.navigate(['/list']);
    });
  }

}
