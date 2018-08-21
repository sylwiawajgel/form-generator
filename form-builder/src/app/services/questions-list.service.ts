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
    let list = this.questionsList;
    item.id = this.questionsNumber++;
    if (item.parentsChain.length !== 0) {
      list = this.findParentItem(item.parentsChain, this.questionsList)
        .children;
    }
    console.log(item);
    list.push(item);
    this.questionsChanged.next(this.questionsList);
  }

  deleteItem(item: QuestionItem) {
    let list = this.questionsList;
    if (item.parentsChain.length !== 0) {
      list = this.findParentItem(item.parentsChain, this.questionsList)
        .children;
    }
    list.splice(this.questionsList.indexOf(item), 1);
  }

  findParentItem(parentsIDChain: number[], questions: QuestionItem[]) {
    let parent: QuestionItem = null;
    questions.map(question => {
      if (question.id === parentsIDChain[0]) {
        parent = question;
        if (parentsIDChain.length > 1) {
          this.findParentItem(parentsIDChain.slice(1), question.children);
        }
        return;
      }
    });
    return parent;
  }
}
