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
  invalidForm = false;
  @Input()
  public questionItem: QuestionItem;

  public questionForm: FormGroup;

  constructor(private questionsListService: QuestionsListService) {
    this.conditionTypesKeys = Object.keys(this.conditionTypes).filter(
      f => !isNaN(Number(f))
    );

    this.answerTypesKeys = Object.keys(this.answerTypes).filter(
      f => !isNaN(Number(f))
    );
  }

  ngOnInit() {
    this.questionForm = new FormGroup({
      conditionType: new FormControl(
        this.questionItem.conditionType || ConditionType["Equal"]
      ),
      expectedAnswer: new FormControl(this.questionItem.expectedAnswer, [
        Validators.required
      ]),
      question: new FormControl(this.questionItem.question, [
        Validators.required
      ]),
      answerType: new FormControl(
        this.questionItem.answerType || AnswerType["Text"]
      )
    });

    if (this.questionItem.expectedAnswerType == AnswerType["Yes/No"]) {
      this.questionForm.get("expectedAnswer").setValue(0);
    }
  }

  saveItem() {
    this.changeItem();
    if (
      this.questionForm.valid ||
      (this.questionItem.recursionLevel === 0 &&
        this.questionForm.get("question").valid)
    ) {
      this.questionsListService.saveItem(this.questionItem);
    }
  }

  addSubInput() {
    if (
      this.questionForm.valid ||
      (this.questionItem.recursionLevel === 0 &&
        this.questionForm.get("question").valid)
    ) {
      this.invalidForm = false;
      const parentsChain = this.questionItem.parentsChain.slice();
      parentsChain.push(this.questionItem.id);
      this.questionsListService.addItem(
        new QuestionItem(
          this.questionItem.recursionLevel + 1,
          parentsChain,
          this.questionForm.get("answerType").value
        )
      );
    } else {
      this.invalidForm = true;
    }
  }

  deleteInput() {
    this.questionsListService.deleteItem(this.questionItem);
  }

  answerTypeChange() {
    this.questionItem.answerType = this.questionForm.get("answerType").value;
    if (this.questionItem.children.length > 0) {
      this.questionsListService.deleteChildren(this.questionItem);
    }
    this.saveItem();
  }

  changeItem() {
    this.questionItem.conditionType = this.questionForm.get(
      "conditionType"
    ).value;
    this.questionItem.expectedAnswer = this.questionForm.get(
      "expectedAnswer"
    ).value;
    this.questionItem.question = this.questionForm.get("question").value;
    this.questionItem.answerType = this.questionForm.get("answerType").value;
  }
}
