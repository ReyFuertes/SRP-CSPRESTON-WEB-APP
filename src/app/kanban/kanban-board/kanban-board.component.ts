import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { where, sortBy, every, filter } from 'underscore';
import { concat } from 'lodash';
import { KanbanBoardService } from '../../shared/services/kanban-board/kanban-board.service';
import { KanbanBoardColumn, KanbanCard } from '../../shared/interfaces/Kanban';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
             selector: 'kanban-board',
             templateUrl: './kanban-board.component.html',
             styleUrls: [ './kanban-board.component.scss' ]
           })
export class KanbanBoardComponent implements OnInit {
  @Input('cards') allCards;
  @Input() viewType: string;
  @Input() filterByType: string;
  @Input() filterByQuery: string;
  @Input() sortBy: string;
  @Input() enableContextMenu: boolean;
  
  rows:any[] = [
    {
      id:1,
      job:'Job 01',
      name:'Name 01',
      status:'In Production',
      issues:[],
      estimate:45623.56,
      cost_to_date:1678.456,
      estimator:'Estimator 01',
      superintendent:'Super 01'
    },
    {
      id:2,
      job:'Job 02',
      name:'Name 02',
      status:'In Production',
      issues:[],
      estimate:45623.56,
      cost_to_date:1678.456,
      estimator:'Estimator 02',
      superintendent:'Super 02'
    },
    {
      id:3,
      job:'Job 03',
      name:'Name 03',
      status:'In Production',
      issues:[],
      estimate:45623.56,
      cost_to_date:1678.456,
      estimator:'Estimator 03',
      superintendent:'Super 03'
    }
  ];
  
  @ViewChildren('scrollable') private scrollableContainers: QueryList<PerfectScrollbarDirective>;
  
  withMenu: boolean = true;
  isDragging: boolean = false;
  
  get cards () {
    return this.allCards;
  }
  
  get columns () {
    return this.board.getColumnsForViewType(this.viewType);
  }
  
  constructor (private board: KanbanBoardService) { }
  
  ngOnInit () {
    this.withMenu = this.enableContextMenu && this.viewType && (this.viewType !== 'grid');
    
  }
  
  getCardsForColumn (column) {
    
    //Re-scope variables
    const filterByType = this.filterByType;
    const filterByQuery = this.filterByQuery;
    
    let cards: any[] = where(this.cards, { column: column });
    
    //Filter cards
    if ( cards.length > 0 && filterByType !== 'all' ) {
      cards = filter(cards, (card) => {
        return card.hasOwnProperty(this.filterByType) && card[ this.filterByType ] === this.filterByQuery;
      });
    }
    
    //Sort cards
    if ( cards.length > 0 ) {
      if ( this.sortBy !== 'none' ) {
        if ( every(cards, (value) => value.hasOwnProperty(this.sortBy)) ) {
          cards = sortBy(cards, (value) => value[ this.sortBy ]);
        } else {
          let sortableCards: any[] = filter(cards, (value) => value.hasOwnProperty(this.sortBy));
          let unsortableCards: any[] = filter(cards, (value) => !value.hasOwnProperty(this.sortBy));
          cards = concat(sortBy(sortableCards, (value) => value[ this.sortBy ]), unsortableCards);
        }
      } else {
        cards = cards; //Redundant, just a visual help
      }
    }
    
    return cards;
  }
  
  noVisibleColumn () {
    return every(this.columns, (column) => {
      return typeof column !== 'undefined' && column !== null && column.hasOwnProperty('visible') && !column.visible;
    });
  }
  
  moveCardAfterDrop (card: KanbanCard, column: KanbanBoardColumn) {
    this.board.moveCard(card, column.id);
    setTimeout(() => {
      this.scrollableContainers.forEach((scrollableContainer, index) => {
        scrollableContainer.update();
        console.log(scrollableContainer.update);
      });
    }, 1);
  }
  
}
