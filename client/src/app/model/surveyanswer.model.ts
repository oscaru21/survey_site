import { AnswerResponder } from "./answerresponder.model";

export class SurveyAnswer{
    public answer: AnswerResponder[];

    constructor(answer: AnswerResponder[]){
        this.answer = answer;
    }
}