import { Component, OnInit, OnDestroy } from "@angular/core";
import { QuestionItem } from "../../models/question-item";
import { QuestionsListService } from "../../services/questions-list.service";

@Component({
  selector: "app-form-list",
  templateUrl: "./form-list.component.html",
  styleUrls: ["./form-list.component.css"]
})
export class FormListComponent implements OnInit, OnDestroy {
  public questionsList: QuestionItem[];
  private questionsChangeSub: any;

  constructor(private questionsListService: QuestionsListService) {}

  ngOnInit() {
    this.questionsList = this.questionsListService.getAllItems();

    this.questionsChangeSub = this.questionsListService.questionsChanged.subscribe(
      questions => {
        this.questionsList = questions;
      }
    );
  }

  ngOnDestroy() {
    this.questionsChangeSub.unsubscribe();
  }
}
