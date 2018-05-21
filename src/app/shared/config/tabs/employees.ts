'use strict';
import { TabItem } from '../../interfaces/Menu';

export const EmployeesTabs: TabItem[] = [
  {
    id: 'view-employees',
    active: false,
    cmp: 'app-view-employees',
    name: 'Employees',
    closeable: true
  },
  {
    id: 'create-employee',
    active: false,
    cmp: 'app-create-employee',
    name: 'New Employee',
    closeable: true
  },
  {
    id: 'employee-timecards',
    active: false,
    cmp: 'app-employee-timecards',
    name: 'Timecards',
    closeable: true
  },

  {
    id: 'view-my-time-cards',
    active: false,
    cmp: 'app-view-my-time-cards',
    name: 'Timecards',
    closeable: true
  },
  {
    id: 'view-my-invoices',
    active: false,
    cmp: 'app-view-my-invoices',
    name: 'Invoices',
    closeable: true
  }
];
