import { Injectable } from "@angular/core";
import { QuestionItem } from "../models/question-item";
import { Subject } from "rxjs";
import { ConditionType } from "../models/condition-type.enum";
import { AnswerType } from "../models/answer-type.enum";

@Injectable({
  providedIn: "root"
})
export class QuestionsListService {
  public questionsList: QuestionItem[] = [];
  public questionsChanged: Subject<QuestionItem[]> = new Subject<
    QuestionItem[]
  >();
  constructor() {
    this.questionsList.push(
      new QuestionItem(
        0,
        1,
        ConditionType["Greater than"],
        "Jak się nazywasz?",
        AnswerType["Yes/No"]
      )
    );
  }

  getAllItems() {
    return this.questionsList;
  }

  addItem() {}

  findItemAsParent(parentID: number, recursionLevel: number) {}

  deleteItem() {}
}
