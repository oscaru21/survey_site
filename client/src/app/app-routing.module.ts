import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { SurveyCreateComponent } from './survey/survey-create/survey-create.component';
import { SurveyListComponent } from './survey/survey-list/survey-list.component';


const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'list', component: SurveyListComponent},
  {path:'create', component: SurveyCreateComponent},
  {path:'edit/:surveyId', component: SurveyCreateComponent},
  {path:'signup', component: SignupComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
