import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { FormsBuilderModule } from "./forms/forms.module";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsBuilderModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
