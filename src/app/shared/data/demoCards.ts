'use strict';
import { KanbanCard } from '../interfaces/Kanban';

export let DemoCards = [
  {
    job: {
      id: 'M16002',
      name: 'CSPreston Satellite'
    },
    customer: 'CSPreston',
    column: 'sales',
    theme: 'success',
    type: 'sales',
    status: 'Ready for Production'
  },
  {
    job: {
      id: 'M16001',
      name: 'CSPreston Main Office'
    },
    customer: 'CSPreston',
    column: 'sales',
    theme: 'warning',
    type: 'sales',
    status: 'Missing Authorization',
    other_issues: [
      {
        description: 'Subcontractor draw missing approval by Superintendent and AP'
      }
    ]
  },
  {
    job: {
      id: 'M16001',
      name: 'CSPreston Main Office'
    },
    customer: 'CSPreston',
    column: 'production',
    theme: 'warning',
    type: 'production',
    status: 'Completed',
    other_issues: [
      {
        description: 'Bill Jones COI expires June 1st (in 11 days)'
      },
      {
        description: '2 Estimates are pending approval'
      },
      {
        description: 'Jake Johnson Missing Timecard (2nd Week of May)'
      }
    ]
  },
  {
    job: {
      id: 'M16001',
      name: 'CSPreston Main Office'
    },
    customer: 'CSPreston',
    column: 'collect_money',
    theme: 'warning',
    type: 'collect_money',
    status: 'No Invoice ($45,123.34 pending)',
    other_issues: [
      {
        description: 'Underbilled by $14,627.23 (3.45%)'
      }
    ]
  },
  {
    job: {
      id: 'M16002',
      name: 'CsPreston Satellite'
    },
    customer: 'CSPreston',
    column: 'collect_money',
    theme: 'success',
    type: 'collect_money',
    status: 'Invoice for $76,123.45 sent on 5/16/2017 (3 days ago). Currently awaiting Payment'
  },
  {
    job: {
      id: 'M16003',
      name: 'CSPreston General'
    },
    customer: 'CSPreston',
    column: 'hold',
    theme: 'danger',
    type: 'hold',
    status: 'On Hold',
    reasons: [
      {
        description: 'Customer Request'
      }
    ]
  },
  {
    job: {
      id: 'M16002',
      name: 'CSPreston Satellite'
    },
    customer: 'CSPreston',
    column: '30_60_90_days',
    theme: 'warning',
    type: 'invoice_due_30',
    due: '34 days ago',
    pending_balance: '$65.123,12',
    invoice: '123456',
    reminders_sent: [
      {
        date: '5/15/2017'
      }
    ]
  },
  {
    job: {
      id: 'M16001',
      name: 'CSPreston Main Office'
    },
    customer: 'CSPreston',
    column: '30_60_90_days',
    theme: 'warning',
    type: 'invoice_due_60',
    due: '69 days ago',
    pending_balance: '97,452.12',
    invoice: '234567',
    reminders_sent: [
      {
        date: '5/10/2107'
      }
    ]
  },
  {
    job: {
      id: 'M16003',
      name: 'CSPreston General'
    },
    customer: 'CSPreston',
    column: '30_60_90_days',
    theme: 'danger',
    type: 'invoice_due_90',
    due: '134 days ago',
    pending_balance: '123,456.78',
    invoice: '345678',
    reminders_sent: [
      {
        date: '5/15/2017'
      },
      {
        date: '4/19/2017'
      },
      {
        date: '2/17/2017'
      }
    ]
  }
];
