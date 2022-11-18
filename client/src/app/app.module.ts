import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './partials/nav/nav.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateSurveyComponent } from './pages/create-survey/create-survey.component';
import { AnswerSurveyComponent } from './pages/answer-survey/answer-survey.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SurveyComponent } from './components/survey/survey.component';
import { QuestionComponent } from './components/question/question.component';
import { MultipleChoiceQuestionComponent } from './components/multiple-choice-question/multiple-choice-question.component';
import { ShortAnswerQuestionComponent } from './components/short-answer-question/short-answer-question.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BottomNavComponent } from './partials/bottom-nav/bottom-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    CreateSurveyComponent,
    AnswerSurveyComponent,
    ProfileComponent,
    SurveyComponent,
    QuestionComponent,
    MultipleChoiceQuestionComponent,
    ShortAnswerQuestionComponent,
    BottomNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
