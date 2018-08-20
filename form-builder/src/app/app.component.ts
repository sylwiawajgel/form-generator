import { Component } from "@angular/core";
import { QuestionsListService } from "./services/questions-list.service";
import { QuestionItem } from "./models/question-item";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";

  constructor(private questionsListService: QuestionsListService) {}

  addInput() {
    this.questionsListService.addItem(new QuestionItem(0));
  }
}
