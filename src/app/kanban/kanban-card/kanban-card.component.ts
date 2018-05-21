import { Component, Input, OnInit } from '@angular/core';
import { KanbanBoardService } from '../../shared/services/kanban-board/kanban-board.service';

@Component({
             selector: 'kanban-card',
             templateUrl: './kanban-card.component.html',
             styleUrls: [ './kanban-card.component.scss' ]
           })
export class KanbanCardComponent implements OnInit {
  @Input() card;
  @Input() columns;
  @Input() withMenu:boolean;
  constructor (private board:KanbanBoardService) { }
  
  ngOnInit () {
  
  }

  public reject() {
    
  }
  
  moveCard = this.board.moveCard;
  approve = this.board.approve;
  adjustAndApprove = this.board.adjustAndApprove;
  requestInvoice = this.board.requestInvoice;
  openRelatedJob = this.board.openRelatedJob;
  markNonAccepted =this.board.markNonAccepted;
}
