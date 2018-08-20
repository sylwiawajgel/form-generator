import { Component, OnInit, Input } from "@angular/core";
import { ConditionType } from "../../models/condition-type.enum";
import { QuestionItem } from "../../models/question-item";
import { AnswerType } from "../../models/answer-type.enum";

@Component({
  selector: "app-form-item",
  templateUrl: "./form-item.component.html",
  styleUrls: ["./form-item.component.css"]
})
export class FormItemComponent implements OnInit {
  @Input()
  public answerType: string = "";
  conditionTypes = ConditionType;
  conditionTypesKeys: any;
  answerTypes = AnswerType;
  answerTypesKeys: any;

  constructor() {
    this.conditionTypesKeys = Object.keys(this.conditionTypes).filter(
      f => !isNaN(Number(f))
    );

    this.answerTypesKeys = Object.keys(this.answerTypes).filter(
      f => !isNaN(Number(f))
    );
  }

  ngOnInit() {
    console.log(this.answerType);
    console.log(this.answerTypes[this.answerType])
  }
}
