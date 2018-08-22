import { Injectable } from "@angular/core";
import { QuestionItem } from "../models/question-item";
import { Subject } from "rxjs";
import { IndexedDBClientService } from "./indexed-db-client.service";

@Injectable({
  providedIn: "root"
})
export class QuestionsListService {
  public questionsList: QuestionItem[] = [];

  constructor(private idbClientService: IndexedDBClientService) {}

  getAllItems() {
    return this.idbClientService.manageData("get").then(data => {
      this.questionsList = data;
      return this.questionsList;
    });
  }

  addItem(item: QuestionItem) {
    const uniqueId =
      Math.random()
        .toString(36)
        .substring(2) + new Date().getTime().toString(36);
    let list = this.questionsList;
    item.id = uniqueId;
    if (item.parentsChain.length !== 0) {
      list = this.findParentItem(item.parentsChain, this.questionsList)
        .children;
    }
    list.push(item);
  }

  saveItem(item: QuestionItem) {
    const parent = this.findParentItem(item.parentsChain, this.questionsList);
    let child;
    if (!parent) {
      child = this.findChild(this.questionsList, item.id);
    } else {
      child = this.findChild(parent.children, item.id);
    }
    child = item;
    this.idbClientService.manageData("put", this.questionsList);
  }

  deleteItem(item: QuestionItem) {
    let list = this.questionsList;
    if (item.parentsChain.length !== 0) {
      list = this.findParentItem(item.parentsChain, this.questionsList)
        .children;
    }
    list.splice(this.questionsList.indexOf(item), 1);
    this.idbClientService.manageData("put", this.questionsList);
  }

  deleteChildren(item: QuestionItem) {
    item.children = [];
    this.idbClientService.manageData("put", this.questionsList);
  }

  findParentItem(parentsIDChain: string[], questions: QuestionItem[]) {
    let parent: QuestionItem = null;
    questions.map(question => {
      if (question.id === parentsIDChain[0]) {
        parent = question;
        if (parentsIDChain.length > 1) {
          parent = this.findParentItem(
            parentsIDChain.slice(1),
            question.children
          );
        } else {
          return;
        }
      }
    });
    return parent;
  }

  findChild(questions: QuestionItem[], id: string) {
    let child: QuestionItem = null;

    questions.map(question => {
      if (question.id === id) {
        child = question;
        return;
      }
    });

    return child;
  }
}
