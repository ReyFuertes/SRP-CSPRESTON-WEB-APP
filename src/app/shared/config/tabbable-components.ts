'use strict';
import { Component } from '@angular/core';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { CreateJobComponent } from '../../jobs/create-job/create-job.component';
import { ViewJobsComponent } from '../../jobs/view-jobs/view-jobs.component';
import { MyAccountComponent } from '../../administration/my-account/my-account.component';
import { WipProcessingComponent } from '../../administration/wip-processing/wip-processing.component';
import { ContactInvoicesComponent } from '../../contacts/contact-invoices/contact-invoices.component';
import { ViewContactsComponent } from '../../contacts/view-contacts/view-contacts.component';
import { ViewEmployeesComponent } from '../../employees/view-employees/view-employees.component';
import { EmployeeTimecardsComponent } from '../../employees/employee-timecards/employee-timecards.component';
import { EmployeeTimeCardItemsComponent } from '../../employees/employee-timecard-items/employee-timecard-items.component';
import { CreateReportComponent } from '../../reports/create-report/create-report.component';
import { ViewReportsComponent } from '../../reports/view-reports/view-reports.component';
import { CreateContactComponent } from '../../contacts/create-contact/create-contact.component';
import { CreateEmployeeComponent } from '../../employees/create-employee/create-employee.component';
import { ViewMyTimeCardsComponent } from '../../employees/view-my-time-cards/view-my-time-cards.component';
import { ViewMyInvoicesComponent } from '../../employees/view-my-invoices/view-my-invoices.component';
import { ContactRolesComponent } from '../../roles/contact-roles/contact-roles.component';
import { EmployeeRolesComponent } from '../../roles/employee-roles/employee-roles.component';
import { WorkTypesComponent } from '../../categories/work-types/work-types.component';
import { JobTypesComponent } from '../../categories/job-types/job-types.component';
import { DamageTypesComponent } from '../../categories/damage-types/damage-types.component';
import { PropertyTypesComponent } from '../../categories/property-types/property-types.component';
import { ReferralTypesComponent } from '../../categories/referral-types/referral-types.component';
import { JobPaymentTermsComponent } from '../../categories/payment-terms/payment-terms.component';
import { DocumentCategoriesComponent } from '../../categories/document-categories/document-categories.component';
import { JobStatusComponent } from '../../categories/job-status/job-status.component';

export const TabbableComponents: [ Component ] | any[] = [
  DashboardComponent, CreateJobComponent, ViewJobsComponent, MyAccountComponent, WipProcessingComponent,
  ContactInvoicesComponent, ViewContactsComponent, ViewEmployeesComponent, EmployeeTimecardsComponent,
  CreateReportComponent, ViewReportsComponent, CreateContactComponent, CreateEmployeeComponent,
  ViewMyTimeCardsComponent, ContactRolesComponent, EmployeeRolesComponent,
  WorkTypesComponent, JobTypesComponent, DamageTypesComponent, PropertyTypesComponent, ReferralTypesComponent, JobPaymentTermsComponent,
  DocumentCategoriesComponent, JobStatusComponent, ViewMyInvoicesComponent, EmployeeTimeCardItemsComponent
];
