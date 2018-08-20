import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ConditionType } from "../../models/condition-type.enum";
import { QuestionItem } from "../../models/question-item";
import { AnswerType } from "../../models/answer-type.enum";
import { QuestionsListService } from "../../services/questions-list.service";

@Component({
  selector: "app-form-item",
  templateUrl: "./form-item.component.html",
  styleUrls: ["./form-item.component.css"]
})
export class FormItemComponent implements OnInit {
  conditionTypes = ConditionType;
  conditionTypesKeys: any;
  answerTypes = AnswerType;
  answerTypesKeys: any;
  @Input()
  public questionItem: QuestionItem;

  constructor(private questionsListService: QuestionsListService) {
    this.conditionTypesKeys = Object.keys(this.conditionTypes).filter(
      f => !isNaN(Number(f))
    );

    this.answerTypesKeys = Object.keys(this.answerTypes).filter(
      f => !isNaN(Number(f))
    );
  }

  ngOnInit() {
    console.log(this.answerTypes[this.questionItem.expectedAnswerType]);
    this.questionItem.answerType = AnswerType["Text"];
    this.questionItem.conditionType = ConditionType["Equal"];
    if (this.questionItem.expectedAnswerType == AnswerType["Yes/No"]) {
      this.questionItem.expectedAnswer = 0;
    }
    console.log(this.questionItem);
  }

  saveItem() {
    console.log(this.questionItem);
    if (this.questionItem.question && this.questionItem.expectedAnswer) {
    }
  }

  addSubInput() {
    const parentsChain = this.questionItem.parentsChain;
    parentsChain.push(this.questionItem.id);
    this.questionsListService.addItem(
      new QuestionItem(
        this.questionItem.recursionLevel + 1,
        parentsChain,
        this.questionItem.answerType
      )
    );
  }
}
