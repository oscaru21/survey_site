
export class Answer
{

  public _id: string;
  public repondent: string;
  public surveyId: string;
  public answer: string[];
  public questionId : string[];
 


  constructor(_id: string,repondent: string,surveyId: string, answer: string[] ,questionId: string[]){
      this._id = _id;
      this.repondent = repondent;
      this.surveyId = surveyId;
      this.answer = answer;
      this.questionId = questionId;
  }
  
}