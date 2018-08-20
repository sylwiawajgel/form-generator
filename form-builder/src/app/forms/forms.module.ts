import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormListComponent } from "./form-list/form-list.component";
import { FormItemComponent } from "./form-item/form-item.component";

@NgModule({
  imports: [CommonModule],
  declarations: [FormListComponent, FormItemComponent],
  exports: [FormListComponent]
})
export class FormsModule {}
