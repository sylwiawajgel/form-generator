import { ConditionType } from "./condition-type.enum";
import { AnswerType } from "./answer-type.enum";

export class QuestionItem {
  public id: string;
  public children: QuestionItem[];

  constructor(
    public recursionLevel: number = null,
    public parentsChain: string[] = [],
    public expectedAnswerType: AnswerType = null,
    public expectedAnswer = null,
    public conditionType: ConditionType = null,
    public question: string = null,
    public answerType: AnswerType = null
  ) {
    this.id = "";
    this.children = [];
  }
}
