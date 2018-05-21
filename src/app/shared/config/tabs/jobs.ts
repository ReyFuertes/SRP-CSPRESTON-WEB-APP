'use strict';
import { TabItem } from '../../interfaces/Menu';

export const JobsTabs: TabItem[] = [
  {
    id: 'view-jobs',
    active: false,
    cmp: 'srp-view-jobs',
    name: 'Jobs',
    closeable: true
  },
  {
    id: 'add-job',
    active: false,
    cmp: 'srp-add-job',
    name: 'New Job',
    closeable: true
  }
];
