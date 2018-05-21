import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { FormsModule as NgFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,NgFormsModule
  ],
  declarations: [SelectComponent],
  exports: [SelectComponent]
})
export class FormsModule { }
