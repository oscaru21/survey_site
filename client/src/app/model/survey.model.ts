export class Survey
{
  constructor(
    public _id: string,
    public creator: string,
    public title: string,
    public description: string,

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
