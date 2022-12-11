export class AnswerResponder {
public _id: string;
  public repondent: string;
  public survey: string;
  public answers : string;
 
  constructor(_id: string,repondent: string,survey: string, answers: string){
      this._id = _id;
      this.repondent = repondent;
      this.survey = survey;
      this.answers = answers;
  }
}