import { Injectable } from "@angular/core";
import { QuestionItem } from "../models/question-item";
import { Subject } from "rxjs";
import { ConditionType } from "../models/condition-type.enum";
import { AnswerType } from "../models/answer-type.enum";

@Injectable({
  providedIn: "root"
})
export class QuestionsListService {
  private questionsNumber: number = 0;
  public questionsList: QuestionItem[] = [];
  public questionsChanged: Subject<QuestionItem[]> = new Subject<
    QuestionItem[]
  >();
  constructor() {}

  getAllItems() {
    return this.questionsList;
  }

  addItem(item: QuestionItem) {
    item.id = this.questionsNumber++;
    if (item.parentID !== null) {
      const parent = this.findItemAsParent(item.parentID, item.recursionLevel);
      parent.children.push(item);
    } else {
      this.questionsList.push(item);
    }
    //this.questionsChanged.next(this.questionsList);
  }

  findItemAsParent(parentID: number, recursionLevel: number) {
    let parent: QuestionItem = null;
    this.questionsList.map(question => {
      if (question.id === parentID) {
        parent = question;
        return;
      }
    });
    return parent;
  }

  deleteItem() {}
}
