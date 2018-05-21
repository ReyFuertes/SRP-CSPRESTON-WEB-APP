import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { KanbanModule } from '../kanban/kanban.module';
import { FormsModule } from '../forms/forms.module';
import { FormsModule as NgFormsModule } from '@angular/forms';

@NgModule({
            imports: [
              CommonModule, KanbanModule, FormsModule, NgFormsModule
            ],
            declarations: [ DashboardComponent ],
            entryComponents: [ DashboardComponent ]
          })
export class DashboardModule {
}
