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
    if (item.parentsChain.length !== 0) {
      const parent = this.findParentItem(item.parentsChain, this.questionsList);
      parent.children.push(item);
    } else {
      this.questionsList.push(item);
    }
    //this.questionsChanged.next(this.questionsList);
  }

  findParentItem(parentsIDChain: number[], questions: QuestionItem[]) {
    let parent: QuestionItem = null;
    questions.map(question => {
      if (question.id === parentsIDChain[0]) {
        console.log("Jest!");
        parent = question;
        if (parentsIDChain.length > 1) {
          this.findParentItem(parentsIDChain.slice(1), question.children);
        }
        return;
      }
    });
    console.log(parent);
    return parent;
  }

  findItemAsParent(
    parentsChain: number[],
    recursionLevel: number,
    index: number = 0
  ) {
    let parent: QuestionItem = null;
    debugger;
    this.questionsList.map(question => {
      if (question.id === parentsChain[index]) {
        parent = question;
        index++;
        if (index >= parentsChain.length) {
          return;
        } else {
          parentsChain = parentsChain.slice(index);
          this.findItemAsParent(parentsChain, recursionLevel);
        }
      }
    });
    return parent;
  }

  deleteItem() {}
}
