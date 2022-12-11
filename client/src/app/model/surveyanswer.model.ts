import { QuestionAnswer } from "./questionanswer.model";

export class SurveyAnswer
{
  public questionsAns : QuestionAnswer[];

  constructor(questionsAns: QuestionAnswer[]){
      
      this.questionsAns = questionsAns;
  }
  
}