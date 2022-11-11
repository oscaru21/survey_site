import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerSurveyComponent } from './pages/answer-survey/answer-survey.component';
import { CreateSurveyComponent } from './pages/create-survey/create-survey.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full', data:{title: 'Home'}},
  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: 'create-survey', component: CreateSurveyComponent, data: {title: 'Create Survey'}},
  {path: 'answer-survey', component: AnswerSurveyComponent, data: {title: 'Answer Survey'}},
  //route to profile TBD
  {path: 'profile/:username', component: ProfileComponent, data: {title: 'My Profile'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
