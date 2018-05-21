'use strict';
import { TabItem } from '../../interfaces/Menu';

export const ContactsTabs: TabItem[] = [
  {
    id: 'view-contacts',
    active: false,
    cmp: 'app-view-contacts',
    name: 'Contacts',
    closeable: true
  },
  {
    id: 'create-contact',
    active: false,
    cmp: 'app-create-contact',
    name: 'New Contact',
    closeable: true
  },
  {
    id: 'contacts-invoices',
    active: false,
    cmp: 'app-contact-invoices',
    name: 'Invoices',
    closeable: true
  }
];
