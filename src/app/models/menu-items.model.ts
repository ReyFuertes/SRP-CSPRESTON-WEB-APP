import { Injectable } from '@angular/core';


export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  target: string;
  name: string;
  type?: string;
}

export interface Menu {
  target?: string;
  name: string;
  type: string;
  icon?: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

let MENUITEMSADMIN = [
 {
    name: 'Dashboard',
    icon: 'fa-dashboard fa-fw',
    type: 'link',
    target: 'dashboard'
  },
  {
    name: 'Jobs',
    icon: 'fa-briefcase fa-fw',
    type: 'link',
    target: 'view-jobs',
  },
  {
    name: 'Contacts',
    icon: 'fa-users fa-fw',
    type: 'link',
    target: 'contacts',
  },
  {
    name: 'Employees',
    icon: 'fa-user-secret fa-fw',
    type: 'link',
    target: 'employees',
  },
  {
    name: 'Reports',
    icon: 'fa-list fa-fw',
    type: 'sub',
    children: [
      {
        name: 'View',
        target: 'view-reports'
      },
      {
        name: 'Create new',
        target: 'create-report'
      }
    ]
  },
  {
    name: 'Administration',
    icon: 'fa-lock fa-fw',
    type: 'sub',
    children: [
      {
        name: 'My Account',
        type: 'link',
        target: 'my-account'
      },
      {
          name: 'Line Items',
          target: 'line-items'
      },
      {
          name: 'Job Status',
          target: 'job-status'
      },
      {
          name: 'Job Types',
          target: 'job-types'
      },
      {
          name: 'Work Types',
          target: 'work-types'
      },
      {
          name: 'Property Types',
          target: 'property-types'
      },
      {
          name: 'Damage Types',
          target: 'damage-types'
      },
      {
          name: 'Referral Types',
          target: 'referral-types'
      },
      {
          name: 'Payment Terms',
          target: 'payment-terms'
      },
      {
          name: 'Document Categories',
          target: 'document-categories'
      },
    {
        name: 'Customer Roles',
        target: 'contact-roles'
    },
    {
        name: 'Employee Roles',
        target: 'employee-roles'
    },
      {
        name: 'Subcontractor Roles',
        target: 'subcontractor-roles'
      }
    ]
  }
];

let MENUITEMSCREW = [
  {
    name: 'Time Record',
    type: 'link',
    target: 'timerecord'
  }
];

let MENUITEMSMANAGERS = [
  {
    name: 'Timecards',
    icon: 'fa-clock-o',
    type: 'link',
    target: 'employee-timecards'
  },
];

let MENU_ITEMS_EMPLOYEE_OFFICE = [
  {
    name: 'Timecards',
    icon: 'fa-clock-o',
    type: 'link',
    target: 'employee-timecards'
  },
];


@Injectable()
export class MenuItems {

  getAll (): Menu[] {
    return MENUITEMSADMIN;
  }

  getAllCrewMenu (): Menu[] {
    return MENUITEMSCREW;
  }

  getAllManagersMenu (): Menu[] {
    return MENUITEMSMANAGERS;
  }

  getEmployeeOfficeMenu (): Menu[] {
    return MENU_ITEMS_EMPLOYEE_OFFICE;
  }
}
