'use strict';
import { TabItem } from '../../interfaces/Menu';

export const AdministrationTabs: TabItem[] = [
  {
    id: 'my-account',
    active: false,
    cmp: 'app-my-account',
    name: 'My Account',
    closeable: true
  },
  {
    id: 'wip-processing',
    active: false,
    cmp: 'app-wip-processing',
    name: 'WIP Processing',
    closeable: true
  }
];
