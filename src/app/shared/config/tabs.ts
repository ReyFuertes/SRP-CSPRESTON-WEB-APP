'use strict';
import { TabItem } from '../interfaces/Menu';
import { concat } from 'lodash';
import { DashboardTabs } from './tabs/dashboard';
import { AdministrationTabs } from './tabs/administration';
import { ContactsTabs } from './tabs/contacts';
import { EmployeesTabs } from './tabs/employees';
import { JobsTabs } from './tabs/jobs';
import { ReportsTabs } from './tabs/reports';
import { FinancialTabs } from './tabs/financials';
import { RolesTab } from './tabs/roles';
import { CategoriesTab } from './tabs/categories';

export let Tabs: [ TabItem ] | any[] = concat(
  DashboardTabs, AdministrationTabs, ContactsTabs, EmployeesTabs, JobsTabs, ReportsTabs, FinancialTabs, RolesTab,
  CategoriesTab
);
