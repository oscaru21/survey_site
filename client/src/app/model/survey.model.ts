export class Survey
{
  constructor(
    public _id: string,
    public creator: string,
    public title: string,
    public description: string,
    public question_1: string,
    public question_2: string,
    public question_3: string,
    public question_4: string,
    public question_5: string,
    public question_6: string,
    public question_7: string,
    public question_8: string,
    public question_9: string,
    public question_10: string,    
  ){}


  // public toString(): string
  // {
  //   return `
  //   Book
  //   -------------------------------
  //   Name       : ${this.creator}
  //   title  : ${this.title}
  //   Description: ${this.description}
  //   -------------------------------
  //   `;
  // }
}
