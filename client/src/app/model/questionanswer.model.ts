export class QuestionAnswer{
    
    public type : String;
    public label_answers : String[];

    constructor(type: String, label_answers: String[]){
        this.type = type;
        this.label_answers = label_answers;
    }
}