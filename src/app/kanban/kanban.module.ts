import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanBoardComponent } from './kanban-board/kanban-board.component';
import { KanbanCardComponent } from './kanban-card/kanban-card.component';
import { ContextMenuModule } from 'ngx-contextmenu';
import { KanbanBoardService } from '../shared/services/kanban-board/kanban-board.service';
import { DragAndDropModule } from '../drag-and-drop/drag-and-drop.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { BlockUIModule } from 'ng-block-ui';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
            imports: [
              CommonModule, ContextMenuModule.forRoot({ useBootstrap4: true, autoFocus: true }),
              DragAndDropModule.forRoot(), PerfectScrollbarModule, BlockUIModule,
              NgxDatatableModule
            ],
            declarations: [ KanbanBoardComponent, KanbanCardComponent ],
            exports: [ KanbanBoardComponent, KanbanCardComponent ],
            providers: [ 
            	KanbanBoardService,
            	{
			      provide: PERFECT_SCROLLBAR_CONFIG,
			      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
			    }
            ]
          })
export class KanbanModule {
}
