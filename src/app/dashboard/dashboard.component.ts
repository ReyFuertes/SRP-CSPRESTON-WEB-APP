import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { KanbanBoardColumn, KanbanCard } from '../shared/interfaces/Kanban';
import { SelectOption } from '../shared/interfaces/Forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KanbanBoardService } from '../shared/services/kanban-board/kanban-board.service';

@Component({
             selector: 'app-dashboard',
             templateUrl: './dashboard.component.html',
             styleUrls: [ './dashboard.component.scss' ]
           })
export class DashboardComponent implements OnInit {
  
  @ViewChild('advancedFilterModal') advancedFilterModal;
  
  options = {
    viewType: null,
    filterByType: 'all',
    filterByQuery: '',
    sortBy: 'none',
    enableContextMenu: true
  };
  
  viewByOptions: SelectOption[];
  
  filterByOptions: SelectOption[];
  
  sortByOptions: SelectOption[];
  
  filterByQueryOptions: any[] = [];
  
  cards: [ KanbanCard ];
  
  constructor (private localStorage: LocalStorageService, private modalService: NgbModal,
               private board: KanbanBoardService) {
    this.viewByOptions = this.board.getViewByOptions();
    this.filterByOptions = this.board.getFilterByOptions();
    this.sortByOptions = this.board.getSortByOptions();
    this.cards = this.board.getCards();
  }
  
  ngOnInit () {
    let viewType, filterByType, filterByQuery, sortBy,enableContextMenu;
    
    if ( viewType = this.localStorage.get('dashboard-view-type') ) {
      this.options.viewType = viewType;
    } else {
      this.options.viewType = 'grid';
      this.localStorage.set('dashboard-view-type', this.options.viewType);
    }
    
    if ( filterByType = this.localStorage.get('dashboard-filter-by-type') ) {
      this.options.filterByType = filterByType;
    } else {
      this.options.filterByType = 'all';
      this.localStorage.set('dashboard-filter-by-type', this.options.filterByType);
    }
    this.setFilterQueryOptions();
    
    if ( filterByQuery = this.localStorage.get('dashboard-filter-by-query') ) {
      this.options.filterByQuery = filterByQuery;
    } else {
      this.options.filterByQuery = '';
      this.localStorage.set('dashboard-filter-by-query', this.options.filterByQuery);
    }
    
    if ( sortBy = this.localStorage.get('dashboard-sort-by') ) {
      this.options.sortBy = sortBy;
    } else {
      this.options.sortBy = 'none';
      this.localStorage.set('dashboard-sort-by', this.options.sortBy);
    }
    
    enableContextMenu = this.localStorage.get('dashboard-enable-context-menu');
    if(typeof enableContextMenu !== 'undefined' && enableContextMenu !== null){
      this.options.enableContextMenu = enableContextMenu;
    }else{
      this.options.enableContextMenu = true;
      this.localStorage.set('dashboard-enable-context-menu',true);
    }
    
  }
  
  clearFilter (): void {
    this.options.filterByType = 'all';
    this.options.filterByQuery = '';
    this.setFilterQueryOptions();
    this.updateFilterByQuery();
  }
  
  openAdvancedFilter (): void {
    this.modalService.open(this.advancedFilterModal);
  }
  
  getColumnsForViewType (): [ KanbanBoardColumn ] | undefined[] {
    return this.board.getColumnsForViewType(this.options.viewType);
  }
  
  setFilterQueryOptions (): void {
    if ( this.options.filterByType === 'all' ) {
      this.options.filterByQuery = '';
      this.filterByQueryOptions = [];
    } else {
      this.filterByQueryOptions = this.board.getFilterQueryOptions(this.options.filterByType);
      this.enableFirstFilterQueryOption();
    }
    this.localStorage.set('dashboard-filter-by-type', this.options.filterByType);
  }
  
  enableFirstFilterQueryOption () {
    this.options.filterByQuery = this.filterByQueryOptions[ 0 ].value;
    this.updateFilterByQuery();
  }
  
  updateFilterByQuery () {
    this.localStorage.set('dashboard-filter-by-query', this.options.filterByQuery);
  }
  
  updateViewType () {
    this.localStorage.set('dashboard-view-type', this.options.viewType);
  }
  
  updateSortBy () {
    this.localStorage.set('dashboard-sort-by', this.options.sortBy);
  }
  
  updateColumnVisibility (name, visibility) {
    let hiddenColumns: string = this.localStorage.get(`dashboard-hidden-columns-${this.options.viewType}-view`);
    let columns: any[];
    if ( hiddenColumns ) {
      columns = JSON.parse(hiddenColumns);
      if ( !visibility ) {
        columns.push(name);
      } else {
        columns.splice(columns.indexOf(name), 1);
      }
      this.localStorage.set(`dashboard-hidden-columns-${this.options.viewType}-view`, JSON.stringify(columns));
    }
  }
  
  updateContextMenuStatus(){
    this.localStorage.set('dashboard-enable-context-menu',this.options.enableContextMenu);
  }
}
