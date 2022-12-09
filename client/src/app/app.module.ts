import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';


import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SurveyCreateComponent } from './survey/survey-create/survey-create.component';
import { HeaderComponent } from './header/header.component';
import { SurveyListComponent } from './survey/survey-list/survey-list.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './admin/auth/auth.component';
import { AdminModule } from './admin/admin.module';
import { JwtModule, JwtHelperService, JwtInterceptor } from '@auth0/angular-jwt';
import { AuthService } from './model/auth.service';
import { RestDataSource } from './model/rest.datasource';
import { AddAnswerDialogComponent } from './survey/add-answer-dialog/add-answer-dialog.component';
import { SurveyAnswerComponent } from './survey/survey-answer/survey-answer.component';

export function jwtTokenGetter(): string
{
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    SurveyCreateComponent,
    HeaderComponent,
    SurveyListComponent,
    FooterComponent,
    HomeComponent,
    AddAnswerDialogComponent,
    SurveyAnswerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    HttpClientModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    AdminModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    })
  ],
  providers: [AuthService, RestDataSource],
  bootstrap: [AppComponent]
})
export class AppModule { }
