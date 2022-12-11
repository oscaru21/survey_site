import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './admin/auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { SurveyCreateComponent } from './survey/survey-create/survey-create.component';
import { SurveyAnswerComponent } from './survey/survey-answer/survey-answer.component';
import { SurveyListComponent } from './survey/survey-list/survey-list.component';
import { SurveyAnalyticsComponent } from './survey-analytics/survey-analytics.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'login', redirectTo: '/admin/auth', pathMatch: 'full'},
  {path:'signup', redirectTo: '/admin/signup', pathMatch: 'full'},
  {path:'list', component: SurveyListComponent},
  {path:'create', component: SurveyCreateComponent, canActivate: [AuthGuard]},
  {path:'edit/:surveyId', component: SurveyCreateComponent},
  {path:'answer/:surveyId', component: SurveyAnswerComponent},
  {path: 'analytics/:surveyId', component: SurveyAnalyticsComponent},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
