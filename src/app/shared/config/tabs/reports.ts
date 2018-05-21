'use strict';
import { TabItem } from '../../interfaces/Menu';

export const ReportsTabs: TabItem[] = [
  {
    id: 'view-reports',
    active: false,
    cmp: 'app-view-reports',
    name: 'Reports',
    closeable: true
  },
  {
    id: 'create-report',
    active: false,
    cmp: 'app-create-report',
    name: 'New Report',
    closeable: true
  }
];
