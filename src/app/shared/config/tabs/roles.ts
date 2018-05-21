'use strict';
import { TabItem } from '../../interfaces/Menu';

export const RolesTab: TabItem[] = [
  {
    id: 'contact-roles',
    active: false,
    cmp: 'app-contact-roles',
    name: 'Customer/Subcon Roles',
    closeable: true
  },
  {
    id: 'employee-roles',
    active: false,
    cmp: 'app-employee-roles',
    name: 'Employee Roles',
    closeable: true
  },
];
