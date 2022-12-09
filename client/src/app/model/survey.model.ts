import { Question } from "./question.model";

export class Survey
{

  public _id: string;
  public creator: string;
  public title: string;
  public description: String;
  public question : Question[];



  constructor(_id: string,creator: string,title: string, description: String, question: Question[]){
      this._id = _id;
      this.creator = creator;
      this.title = title;
      this.description = description;
      this.question = question;
  }
  
}
