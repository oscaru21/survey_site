import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SurveyCreateComponent } from './survey/survey-create/survey-create.component';
import { SurveyListComponent } from './survey/survey-list/survey-list.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'login', redirectTo: '/admin/auth', pathMatch: 'full'},
  {path:'signup', redirectTo: '/admin/signup', pathMatch: 'full'},
  {path:'list', component: SurveyListComponent},
  {path:'create', component: SurveyCreateComponent},
  {path:'edit/:surveyId', component: SurveyCreateComponent},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
