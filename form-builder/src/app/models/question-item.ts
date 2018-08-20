import { ConditionType } from "./condition-type.enum";
import { AnswerType } from "./answer-type.enum";

export class QuestionItem {
  public id: number;
  public children: QuestionItem[];

  constructor(
    public recursionLevel: number,
    public parentID: number,
    public conditionType: ConditionType,
    public question: string,
    public answerType: AnswerType
  ) {
    this.id = 0;
    this.children = [];
  }
}
