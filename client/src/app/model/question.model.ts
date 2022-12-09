import { Option } from "./option.model";

export class Question{
    _id: string;
    position: number;
    label: String;
    type: String;
    options: Option[];

    constructor(_id: string, position: number, label: String, type: String ,options : Option[]) {
       this._id = _id;
       this.position = position;
       this.label = label;
       this.type = type;
       this.options = options;
    }
}