import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { QuestionItem } from "../../models/question-item";
import { QuestionsListService } from "../../services/questions-list.service";

@Component({
  selector: "app-form-list",
  templateUrl: "./form-list.component.html",
  styleUrls: ["./form-list.component.css"]
})
export class FormListComponent implements OnInit {
  @Input()
  public questionsList: QuestionItem[] = null;
  private questionsChangeSub: any;

  constructor(private questionsListService: QuestionsListService) {}

  ngOnInit() {
    if (!this.questionsList) {
      this.questionsListService.getAllItems().then(data => {
        this.questionsList = data;
      });
    }
  }
}
