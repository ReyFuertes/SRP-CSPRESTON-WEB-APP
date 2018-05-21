'use strict';
import { SelectOption } from '../interfaces/Forms';

export const StatusFilterQueryOptions: SelectOption[] = [
  { name: 'Sales', value: 'sales' },
  { name: 'Production', value: 'production' },
  { name: 'Collect Money', value: 'collectMoney' },
  { name: 'Hold', value: 'hold' },
  { name: '30/60/90 Days', value: '30-60-90-days' }
];

export const UserRoleFilterQueryOptions: SelectOption[] = [
  { name: 'Accounts Payable', value: 'accounts_payable' },
  { name: 'Accounts Receivable', value: 'accounts_receivable' },
  { name: 'Crew', value: 'crew' },
  { name: 'Estimator', value: 'estimator' },
  { name: 'Super Intendent', value: 'super_intendent' },
  { name: 'Staff', value: 'staff' }
];
