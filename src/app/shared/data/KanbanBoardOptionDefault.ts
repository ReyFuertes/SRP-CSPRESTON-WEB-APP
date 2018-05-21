'use strict';
import { SelectOption } from '../interfaces/Forms';

export const KanbanBoardViewByOptions: SelectOption[] = [
  { value: 'dueDate', name: 'Due Date' },
  { value: 'status', name: 'Status' },
  { value: 'tasks', name: 'Tasks' },
  { value: 'grid', name: 'Grid' }
];

export const KanbanBoardFilterByOptions: SelectOption[] = [
  { value: 'all', name: 'All' },
  { value: 'customer', name: 'Customer' },
  { value: 'date', name: 'Date' },
  { value: 'employee', name: 'Employee' },
  { value: 'job', name: 'Job' },
  { value: 'status', name: 'Status' },
  { value: 'userRole', name: 'User Role' }
];

export const KanbanBoardSortByOptions: SelectOption[] = [
  { value: 'none', name: 'None' },
  { value: 'customer', name: 'Customer' },
  { value: 'job', name: 'Job' },
  { value: 'employee', name: 'Employee' },
  { value: 'status', name: 'Status' },
  { value: 'date', name: 'Date' }
];
