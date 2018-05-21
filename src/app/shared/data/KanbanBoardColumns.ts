'use strict';
import { KanbanBoardColumn } from '../interfaces/Kanban';

export const StatusTypeColumns: KanbanBoardColumn[] = [
  { name: 'Sales', id: 'sales', visible: true },
  { name: 'Production', id: 'production', visible: true },
  { name: 'Collect Money', id: 'collect_money', visible: true },
  { name: 'Hold', id: 'hold', visible: true },
  { name: '30/60/90 Days', id: '30_60_90_days', visible: true }
];

export const TaskTypeColumns: KanbanBoardColumn[] = [
  { name: 'Underbilled', id: 'underbilled', visible: true },
  { name: 'Missing Budgets/Estimates', id: 'missing_budgets_estimates', visible: true },
  { name: 'Documents awaiting Signature', id: 'documents_awaiting_signature', visible: true },
  { name: 'Estimates for Approval', id: 'estimates_for_approval', visible: true },
  { name: 'Stalled Sales', id: 'stalled_sales', visible: true },
  { name: 'Invoice Reminders', id: 'invoice_reminders', visible: true }
];

export const DueDateTypeColumns: KanbanBoardColumn[] = [
  { name: 'Past Due', id: 'past_due', visible: true },
  { name: 'Due Today', id: 'due_today', visible: true },
  { name: 'Due Tomorrow', id: 'due_tomorrow', visible: true },
  { name: 'Due Next Week', id: 'due_next_week', visible: true }
];
