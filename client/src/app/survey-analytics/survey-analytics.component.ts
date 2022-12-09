import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import domToImage from 'dom-to-image';


@Component({
  selector: 'app-survey-analytics',
  templateUrl: './survey-analytics.component.html',
  styleUrls: ['./survey-analytics.component.css']
})
export class SurveyAnalyticsComponent implements OnInit {

  constructor() { }

  public chartData: Object [];
  public  primaryXAxis: Object;
  public title: Object;
  ngOnInit(): void {
    this.chartData = [
      { year:'2000', gold: 35, silver: 25 }, { year: '2001', gold: 28, silver: 20 },
      { year:'2002', gold: 34, silver: 21 }, { year: '2003', gold: 32, silver: 15 },
      { year:'2004', gold: 40, silver: 30 } 
   ];  
   this.primaryXAxis = { valueType: 'Category' };

   this.title = "Question 1";
  }

  @ViewChild('dataToExport', {static: false}) public dataToExport: ElementRef;

  public dummyFunction(): void{
    console.log("I'm in danger");
  }
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
      const pdf = new jsPDF("p", "pt", [width+50, height+220]);
      pdf.setFontSize(48);
      pdf.setTextColor('#2585fe');
      pdf.addImage(result, 'PNG', 25, 185, width, height);
      pdf.save('SurveyResults.pdf');
    }).catch(error => {
      console.log("Not able to download pdf");
      
    });
  };
}
