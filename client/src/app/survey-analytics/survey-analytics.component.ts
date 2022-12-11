import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms' ;
import { ActivatedRoute, ParamMap } from '@angular/router';
import jsPDF from 'jspdf';
import domToImage from 'dom-to-image';
import { SurveyAnswer } from '../model/surveyanswer.model';
import { QuestionAnswer } from '../model/questionanswer.model';
import { Survey } from '../model/survey.model'
import { Question } from '../model/question.model'
import { Option } from '../model/option.model';
import { SurveysService } from '../survey/surveys.service';
import { ConstantPool } from '@angular/compiler';


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
  questionAnswerModel: QuestionAnswer;
  fields = [];
  uniqueAnswers :String [] = [];
  surveyResponder: FormControl;

  ngOnInit(): void {

    this.chartData = [
      { year:'2000', gold: 35, silver: 25 }, { year: '2001', gold: 28, silver: 20 },
      { year:'2002', gold: 34, silver: 21 }, { year: '2003', gold: 32, silver: 15 },
      { year:'2004', gold: 40, silver: 30 } 
   ];  
   
   this.primaryXAxis = { valueType: 'Category' };
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{

      this.surveysService.getSurvey(paramMap.get('surveyId')).subscribe( (data) => { 
        this.surveyModel =  new Survey(
          data['surveys']._id,
          data['surveys'].creator,
          data['surveys'].title,
          data['surveys'].description,
          data['surveys'].questions);
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

  buildChart(survey: Survey){
    let auxArray : Object [] = [];
    survey.question.forEach(element => {
      element.options.forEach(ele =>{
        auxArray.push({option: ele.label, answer: 10});  
      })
      if(element.type != "TEXT"){
      this.customChartDataArray.push(auxArray);
      auxArray = []
      }
    });
    console.log(this.customChartDataArray);
    this.surveysService.getAnswerSurvey(survey._id).subscribe( (data) => {
      console.log(data);
      console.log(data['questions']);
      this.surveyAnswerModel =  new SurveyAnswer(
        data['questions'].questionAns
      )
      console.log(this.surveyAnswerModel)
      this.buildAnswer(this.surveyAnswerModel);

      console.log(this.surveyAnswerModel);
      
      let answerFrequencyMap = new Map<String, number>();
      this.surveyAnswerModel.questionsAns.forEach(answer =>{
        console.log(answer);
        if(answer.type != "TEXT"){
          console.log(answer.label_answers);
          answer.label_answers.forEach(label => {
            if(answerFrequencyMap.has(label)){
              answerFrequencyMap.set(label, answerFrequencyMap.get(label)+1);
            } 
            else{
              answerFrequencyMap.set(label, 1);
            }
            console.log(answerFrequencyMap)
            //console.log(this.customChartDataArray)
          });
        }
      });
      console.log(this.customChartDataArray);
      


      this.customChartDataArray.forEach(arr =>{
        console.log(arr);
        let k = 0;
        survey.question.forEach(ele => {
          ele.options.forEach(elem => {
            arr[k].answer = answerFrequencyMap.get(elem.label);
            k++;
          })
        });
        this.dataSource = this.customChartDataArray;
        console.log(this.customChartDataArray)
      })
      
    });
  }

  buildAnswer(surveyAnswer : SurveyAnswer){
    console.log('Pre build answer')
    console.log(surveyAnswer.questionsAns);
    this.answerForm = new FormGroup({
      questionAnswer: this.fb.array(this.getAnswerFromGroup(surveyAnswer.questionsAns))
    });
  }

  getAnswerFromGroup(questionAnswer : QuestionAnswer[]){
    console.log('in answerfromgroup')
    let listAnswersPerQuestion = [];
    questionAnswer.forEach(answer => {
      let answerForm = this.fb.group({
        type: new FormControl(answer.type),
        label_answers: new FormControl(answer.label_answers)
      });
      listAnswersPerQuestion.push(answerForm)
    });
    return listAnswersPerQuestion;
  }


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

  getQuestions() {

    //return <FormArray> this.surveyForm.controls['questions'];
    return (<FormArray> this.surveyForm.controls['questions']).controls;
    //return <FormArray> this.surveyForm.controls['questions'];
    //return this.surveyForm.get('questions') as FormArray;
   }

   /*getOptions(i) : FormArray{
    const control = this.getQuestions().controls[i];
    let options = control.get('options') as FormArray ;
    return options;
   }*/


  //To export to PDF
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
