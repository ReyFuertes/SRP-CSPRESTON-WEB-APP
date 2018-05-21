import { Injectable } from '@angular/core';
import { DueDateTypeColumns, StatusTypeColumns, TaskTypeColumns } from '../../data/KanbanBoardColumns';
import { cloneDeep, each, find } from 'lodash';
import { SelectOption } from '../../interfaces/Forms';
import { StatusFilterQueryOptions, UserRoleFilterQueryOptions } from '../../data/KanbanBoardFilterQueryOptions';
import {
  KanbanBoardFilterByOptions, KanbanBoardSortByOptions, KanbanBoardViewByOptions
} from '../../data/KanbanBoardOptionDefault';
import { KanbanBoardColumn, KanbanCard } from '../../interfaces/Kanban';
import { DemoCards } from '../../data/demoCards';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class KanbanBoardService {
  
  columns = {
    status: cloneDeep(StatusTypeColumns),
    tasks: cloneDeep(TaskTypeColumns),
    dueDate: cloneDeep(DueDateTypeColumns)
  };
  
  filterQueryOptions = {
    status: cloneDeep(StatusFilterQueryOptions),
    userRole: cloneDeep(UserRoleFilterQueryOptions)
  };
  
  viewByOptions: SelectOption[] = cloneDeep(KanbanBoardViewByOptions);
  
  filterByOptions: SelectOption[] = cloneDeep(KanbanBoardFilterByOptions);
  
  sortByOptions: SelectOption[]  = cloneDeep(KanbanBoardSortByOptions);
  
  cards;
  
  constructor (private localStorage: LocalStorageService) {
    this.cards = DemoCards;
  }
  
  getCards (): [ KanbanCard ] {
    return this.cards;
  }
  
  getColumnsForViewType (viewType): any[] {
    if ( viewType === 'grid' ) {
      return [];
    } else {
      let columns: [ KanbanBoardColumn ] = this.columns[ viewType ];
      let hiddenColumns: string = this.localStorage.get(`dashboard-hidden-columns-${viewType}-view`);
      let _columns: [ string ];
      if ( hiddenColumns ) {
        try {
          _columns = JSON.parse(<string>hiddenColumns);
          each(_columns, (hiddenColumn: string) => {
            find(columns, (column) => column.name === hiddenColumn).visible = false;
          });
        }
        catch ( e ) {}
      } else {
        this.localStorage.set(`dashboard-hidden-columns-${viewType}-view`, JSON.stringify([]));
      }
      return columns;
    }
  }
  
  getFilterQueryOptions (filterByType: string): any[] {
    if ( filterByType === 'customer' ) {
      return []; //TODO load customers from DB
    } else if ( filterByType === 'employee' ) {
      return []; //TODO load employees from DB
    } else if ( filterByType === 'job' ) {
      return []; //TODO load jobs from DB
    } else {
      if ( filterByType !== 'all' && filterByType !== 'date' ) {
        return this.filterQueryOptions.hasOwnProperty(filterByType) ? this.filterQueryOptions[ filterByType ] : [];
      }
      return [];
    }
  }
  
  getViewByOptions () {
    return this.viewByOptions;
  }
  
  getFilterByOptions () {
    return this.filterByOptions;
  }
  
  getSortByOptions () {
    return this.sortByOptions;
  }
  
  moveCard (card, column) {
    card.column = column;
    //TODO update status in DB
  }
  
  approve () {
  
  }
  
  adjustAndApprove () {
  
  }
  
  requestInvoice () {
  
  }
  
  openRelatedJob () {
  
  }
  
  markNonAccepted () {
  
  }
  
}
