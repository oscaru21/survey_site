import { Component,ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms' ;
import { ActivatedRoute, ParamMap } from '@angular/router';
import {jsPDF} from 'jspdf';
import domToImage from 'dom-to-image';
import { SurveysService } from '../../survey/surveys.service';
import { SurveyAnswer } from 'src/app/model/surveyanswer.model';
import { Survey } from 'src/app/model/survey.model';
import { AnswerResponder } from 'src/app/model/answerresponder.model';
import { Option } from 'src/app/model/option.model';
import { Question } from 'src/app/model/question.model';
import * as passport from 'passport';
import { IPointRenderEventArgs } from '@syncfusion/ej2-angular-charts';


@Component({
  selector: 'app-survey-analytics',
  templateUrl: './survey-analytics.component.html',
  styleUrls: ['./survey-analytics.component.css']
})
export class SurveyAnalyticsComponent implements OnInit {

  constructor(public surveysService: SurveysService, public route: ActivatedRoute, private fb: FormBuilder) { }
  public customChartDataArray: Object [] = [];
  public dataSource: Object [] = [];
  public chartData: Object [];
  public customChartData: Object [] = [];
  public  primaryXAxis: Object;
  public title: Object;

  questionsLabels: Object [];
  surveyForm: FormGroup;
  answerForm: FormGroup = null;
  private surveyId:string;
  surveyModel:Survey;
  surveyAnswerModel: SurveyAnswer;
  answerModel: AnswerResponder;
  fields = [];
  uniqueAnswers :String [] = [];
  surveyResponder: FormControl;

  public pointRender(args: IPointRenderEventArgs): void {
    let seriesColor: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883',
            '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb', '#ea7a57'];
    args.fill = seriesColor[args.point.index];
  };

  ngOnInit(): void {
    this.primaryXAxis = { valueType: 'Category' };
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{

      this.surveysService.getSurvey(paramMap.get('surveyId')).subscribe( (data) => { 
        this.surveyModel =  new Survey(
          data['surveys']._id,
          data['surveys'].creator,
          data['surveys'].title,
          data['surveys'].expiredDate,
          data['surveys'].description,
          data['surveys'].questions
        )
          console.log(this.surveyModel.question);
          this.buildSurvey();
          
          //console.log(this.surveyModel);
          
          this.buildChart(this.surveyModel);
          

          this.surveyResponder = new FormControl('');
          this.surveyForm.addControl("surveyResponder", this.surveyResponder);
          this.surveyModel.question.forEach(question =>{ 
              this.surveyForm.addControl(""+question._id, new FormControl(''));
              this.fields.push(question._id);
          })
      }); 
      //

      //
    });


  }
  //Methods to build chart
  //Please do not touch, unless you want to have a slow and painful time
  buildChart(survey: Survey){
    let auxArray : Object [] = [];
    survey.question.forEach(element => {
      element.options.forEach(ele =>{
        auxArray.push({option: ele.label, answer: 0});  
      })
      if(element.type != "TEXT"){
      console.log('I got here!');
      this.customChartDataArray.push(auxArray);
      auxArray = []
      }
    });
    console.log(this.customChartDataArray);
    
    let map = new Map();
    let answerFrequencyMap = new Map<String, number>();
    this.surveysService.getAnswerSurvey(survey._id).subscribe( (data) => {
      console.log(data);
      //console.log(data['answers']);
      this.surveyAnswerModel =  new SurveyAnswer(
        data['answer']
      )
      this.surveyAnswerModel.answer.forEach(ele => {
        //console.log(ele.answers)
        let auxResponse = Object.entries(JSON.parse(ele.answers));
        let i = 0;
        auxResponse.forEach(ele => {
          console.log(ele)
          ele.forEach(response => {
            console.log(ele[i])
            let helper : String [] = [];
            
            if(Array.isArray(ele[i])){
              helper = <String []> ele[i];
              helper.forEach(helperResponse => {
                console.log(helperResponse);
                if(answerFrequencyMap.has(<String> helperResponse)){
                  answerFrequencyMap.set(<String>helperResponse, answerFrequencyMap.get(<String>helperResponse)+1);
                }
                else{
                   answerFrequencyMap.set(<String>helperResponse, 1)
                }
              }
            )}
          
            if(i == 0){
              let questionLabel = response
              console.log("Question Label " + questionLabel)
              i++;
            }
            else{
              if(answerFrequencyMap.has(<String> response)){
                answerFrequencyMap.set(<String>ele[i], answerFrequencyMap.get(<String>response)+1);
              }
              else{
                 answerFrequencyMap.set(<String>response, 1)
              }
              i++;
            }
          })
          i = 0;
          
          
          //console.log(ele[1]);
          
        })
        answerFrequencyMap.forEach((value: number, key: String)=> {
          if(Array.isArray(key)){
            answerFrequencyMap.delete(key)
          }
        })

      });
      //console.log(answerFrequencyMap);
      //console.log(this.customChartDataArray)
      for(let m = 0; m < this.customChartDataArray.length; m++){
        //console.log(this.customChartDataArray[m]);
        for(let n = 0; n < this.customChartDataArray.length; n++){
          //console.log(this.customChartDataArray[m][n].option);
          if(answerFrequencyMap.has(this.customChartDataArray[m][n].option)){
            //console.log("Answer value: " + this.customChartDataArray[m][n].answer)
            //console.log("Value in map: " + answerFrequencyMap.get(this.customChartDataArray[m][n].option));
            this.customChartDataArray[m][n].answer = answerFrequencyMap.get(this.customChartDataArray[m][n].option);
          }
        }
      }
      this.dataSource = this.customChartDataArray;
      //console.log(this.dataSource)
      
    });
  }


  ///Methods tu build survey
  buildSurvey() {
    this.surveyForm = new FormGroup({
      questions: this.fb.array(this.getQuestionFormGroup(this.surveyModel.question)) ,
    });
  }

  getQuestionFormGroup(question: Question[]) { 
    let listQuestions = [];
    question.forEach(question => {
      
      let questionForm =  this.fb.group({
        _id:new FormControl(question._id),
        position: new FormControl(question.position),
        label: new FormControl(question.label),
        type: new FormControl(question.type),
        options: this.fb.array(this.getOptionFormGroup(question.options))
      });
      listQuestions.push(questionForm);
    });
   
    console.log(listQuestions);

    return listQuestions;
  }

  getOptionFormGroup(option: Option[]) { 
    let listOption = [];
   
    option.forEach(option=>{
      let optionForm = this.fb.group({
        formGroupFields:new FormControl(option._id),
        position: new FormControl(option.position),
        label: new FormControl(option.label),
      });
      listOption.push(optionForm);
    });
    return listOption;
  }

  getFormControlsFields() {
    const formGroupFields = {};
    this.surveyModel.question.forEach(question=>{
      for (const field of Object.keys(question)) {
        formGroupFields[field] = new FormControl('');
        this.fields.push(field);
      }
    });
  
    return formGroupFields;
  }
  getQuestions() : FormArray{
    return this.surveyForm.get('questions') as FormArray;
   }

  //to create PDF
  @ViewChild('dataToExport', {static: false}) public dataToExport: ElementRef;

  public downloadAsPdf(): void{
    const width = this.dataToExport.nativeElement.clientWidth;
    const height = this.dataToExport.nativeElement.clientHeight + 40;
    let orientation = "portrait";
    let imageUnit = "pt";

    domToImage.toPng(this.dataToExport.nativeElement, {width: width, height: height}).then(result => {
      let jsPdfOptions = {
        orientation: orientation,
        unit: imageUnit,
        format: "a4"//[width + 50, height + 220]
      };
      const pdf = new jsPDF("l", "pt", [width+50, height+220]);
      pdf.setFontSize(48);
      pdf.setTextColor('#2585fe');
      pdf.addImage(result, 'PNG', 25, 185, width, height);
      pdf.save('SurveyResults.pdf');
    }).catch(error => {
      console.log("Not able to download pdf");
      
    });
  };
}
