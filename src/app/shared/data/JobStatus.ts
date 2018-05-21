'use strict';
import { SelectOption } from '../interfaces/Forms';

export const JobStatus: SelectOption[] = [
  { value: 'Sales', name: 'Sales' },
  { value: 'Production', name: 'Production' },
  { value: 'Non-accepted', name: 'Non Accepted' },
  { value: 'Collect-money', name: 'Collect Money' },
  { value: 'Closed', name: 'Closed' },
  { value: 'Hold', name: 'Hold' },
  { value: '30-days', name: '30 Days - Collect Money' },
  { value: '60-days', name: '60 Days - Collect Money' },
  { value: '90-days', name: '90 Days - Collect Money' }
];
