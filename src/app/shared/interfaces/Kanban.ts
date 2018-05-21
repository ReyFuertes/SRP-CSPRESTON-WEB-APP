'use strict';

export interface KanbanCard{
  job:KanbanCardJob,
  customer:string,
  column:string,
  theme:string,
  type:string,
  status?:string,
  other_issues?:[KanbanCardOtherIssue],
  reasons?:[KanbanCardReason],
  due?:string|number,
  pending_balance?:string|number,
  invoice?:string|number,
  reminders_sent?:[KanbanCardInvoiceReminder]
}

export interface KanbanCardJob{
  id:string|number,
  name:string
}

export interface KanbanCardOtherIssue{
  description:string
}

export interface KanbanCardReason{
  description:string
}

export interface KanbanCardInvoiceReminder{
  date:string|number
}

export interface KanbanBoardColumn{
  name:string,
  id:string,
  visible:boolean
}
