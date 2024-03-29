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
import { MatListModule} from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { CategoryService, LegendService, TooltipService } from '@syncfusion/ej2-angular-charts';
import { DataLabelService, ColumnSeriesService } from '@syncfusion/ej2-angular-charts';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SurveyCreateComponent } from './survey/survey-create/survey-create.component';
import { HeaderComponent } from './header/header.component';
import { SurveyListComponent } from './survey/survey-list/survey-list.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './admin/auth/auth.component';
import { RegisterComponent } from './admin/register/register.component';
import { AdminModule } from './admin/admin.module';
import { JwtModule, JwtHelperService, JwtInterceptor } from '@auth0/angular-jwt';
import { AuthService } from './model/auth.service';
import { RestDataSource } from './model/rest.datasource';
import { AddAnswerDialogComponent } from './survey/add-answer-dialog/add-answer-dialog.component';
import { SurveyAnswerComponent } from './survey/survey-answer/survey-answer.component';
import { SurveyAnalyticsComponent } from './survey/survey-analytics/survey-analytics.component';

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
    AuthComponent,
    RegisterComponent,
    SurveyAnalyticsComponent
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
    MatDatepickerModule,
    MatMenuModule,
    MatNativeDateModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    }),
    ChartModule,
  ],
  providers: [AuthService, RestDataSource, CategoryService, ColumnSeriesService, LegendService, TooltipService, DataLabelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
