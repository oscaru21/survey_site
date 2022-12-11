
export class Answer
{

  public _id: string;
  public repondent: string;
  public survey: string;
  public questions : string;
 
  constructor(_id: string,repondent: string,survey: string, questions: string){
      this._id = _id;
      this.repondent = repondent;
      this.survey = survey;
      this.questions = questions;
  }
  
}