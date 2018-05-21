'use strict';
import { TabItem } from '../../interfaces/Menu';

export const CategoriesTab: TabItem[] = [
  {
    id: 'line-item',
    active: false,
    cmp: 'app-line-items',
    name: 'Line Items',
    closeable: true
  },
  {
    id: 'job-status',
    active: false,
    cmp: 'app-job-status',
    name: 'Job Status',
    closeable: true
  },
  {
    id: 'job-types',
    active: false,
    cmp: 'app-job-types',
    name: 'Job Types',
    closeable: true
  },
  {
    id: 'work-types',
    active: false,
    cmp: 'app-work-types',
    name: 'Work Types',
    closeable: true
  },
  {
    id: 'property-types',
    active: false,
    cmp: 'app-property-types',
    name: 'Property Types',
    closeable: true
  },
  {
    id: 'damage-types',
    active: false,
    cmp: 'app-damage-types',
    name: 'Damage Types',
    closeable: true
  },
  {
    id: 'referral-types',
    active: false,
    cmp: 'app-referral-types',
    name: 'Referral Types',
    closeable: true
  },
  {
    id: 'payment-terms',
    active: false,
    cmp: 'app-payment-terms',
    name: 'Payment Terms',
    closeable: true
  },
  {
    id: 'document-categories',
    active: false,
    cmp: 'app-document-categories',
    name: 'Document Categories',
    closeable: true
  },
];
