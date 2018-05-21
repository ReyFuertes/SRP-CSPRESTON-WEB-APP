import { Routes } from '@angular/router';
import { LoggedInGuard } from './middlewares/logged-in-guard';
import { JobAddComponent } from './jobs/add-job/add-job.component';
import { JobEditComponent } from './jobs/edit-job/edit-job.component';
import { ViewJobsComponent } from './jobs/view-jobs/view-jobs.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { ChangeComponent } from './authentication/change/change.component';
import { ForgotComponent } from './authentication/forgot/forgot.component';
import { SignoutComponent } from './authentication/signin/signout.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { JobTypesComponent } from './categories/job-types/job-types.component';
import { LineItemsComponent } from './categories/line-items/line-items.component';
import { WorkTypesComponent } from './categories/work-types/work-types.component';
import { JobStatusComponent } from './categories/job-status/job-status.component';
import { ViewReportsComponent } from './reports/view-reports/view-reports.component';
import { EditContactComponent } from './contacts/edit-contact/edit-contact.component';
import { ContactRolesComponent } from './roles/contact-roles/contact-roles.component';
import { MyAccountComponent } from './administration/my-account/my-account.component';
import { CreateReportComponent } from './reports/create-report/create-report.component';
import { JobFinancialsComponent } from './jobs/job-financials/job-financials.component';
import { JobDocumentsComponent } from './jobs/job-documents/job-documents.component';
import { DamageTypesComponent } from './categories/damage-types/damage-types.component';
import { ViewContactsComponent } from './contacts/view-contacts/view-contacts.component';
import { EmployeeRolesComponent } from './roles/employee-roles/employee-roles.component';
import { EditEmployeeComponent } from './employees/edit-employee/edit-employee.component';
import { EditEstimateComponent } from './financials/edit-estimate/edit-estimate.component';
import { CreateContactComponent } from './contacts/create-contact/create-contact.component';
import { ViewEmployeesComponent } from './employees/view-employees/view-employees.component';
import { ReferralTypesComponent } from './categories/referral-types/referral-types.component';
import { JobPaymentTermsComponent } from './categories/payment-terms/payment-terms.component';
import { PropertyTypesComponent } from './categories/property-types/property-types.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { CreateTimeCardComponent } from './employees/create-timecard/create-timecard.component';
import { CreateEstimateComponent } from './financials/create-estimate/create-estimate.component';
import { WipProcessingComponent } from './administration/wip-processing/wip-processing.component';
import { ContactInvoicesComponent } from './contacts/contact-invoices/contact-invoices.component';
import { EmployeeTimecardsComponent } from './employees/employee-timecards/employee-timecards.component';
import { DocumentCategoriesComponent } from './categories/document-categories/document-categories.component';
import { RedirectIfNotLoggedInGuard } from './guards/redirect-if-not-logged-in/redirect-if-not-logged-in.guard';
import { EmployeeTimeCardItemsComponent } from './employees/employee-timecard-items/employee-timecard-items.component';
import {SubcontractorRolesComponent} from './roles/subcontractor-roles/subcontractor-roles.component';

export const AppRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  { path: 'login',  component: SigninComponent },
  { path: 'logout',  component: SignoutComponent },
  { path: 'forgot',  component: ForgotComponent },
  { path: 'password/:token',  component: ChangeComponent },
  { path: 'dashboard',  component: AdminLayoutComponent, canActivate: [LoggedInGuard] },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        path: 'timecards',
        component: EmployeeTimecardsComponent
      },
      {
        path: 'employee-timecards',
        component: EmployeeTimecardsComponent
      },
      {
        path: 'employee-timecard-items/:id',
        component: EmployeeTimeCardItemsComponent
      },
      {
        path: 'contacts-invoices',
        component: ContactInvoicesComponent
      },
      {
        path: 'view-jobs',
        component: ViewJobsComponent
      },
      {
        path: 'edit-job/:id',
        component: JobEditComponent
      },
      {
        path: 'financials/:id',
        component: JobFinancialsComponent
      },
      {
        path: 'estimate/:id/create',
        component: CreateEstimateComponent
      },
      {
        path: 'estimate/:id/edit/:estimate_id',
        component: EditEstimateComponent
      },
      {
        path: 'contacts',
        component: ViewContactsComponent,
      },
      {
        path: 'contacts/edit/:id',
        component: EditContactComponent
      },
      {
        path: 'contacts/create',
        component: CreateContactComponent
      },
      {
        path: 'add-job',
        component: JobAddComponent
      },
      {
        path: 'employees',
        component: ViewEmployeesComponent
      },
      {
        path: 'employees/create',
        component: CreateEmployeeComponent
      },
      {
        path: 'employees/edit/:id',
        component: EditEmployeeComponent
      },
      {
        path: 'contact-roles',
        component: ContactRolesComponent
      },
      {
        path: 'employee-roles',
        component: EmployeeRolesComponent
      },
      {
        path: 'subcontractor-roles',
        component: SubcontractorRolesComponent
      },
      {
        path: 'line-items',
        component: LineItemsComponent
      },
      {
        path: 'job-documents/:id',
        component: JobDocumentsComponent
      },
      {
        path: 'job-status',
        component: JobStatusComponent
      },
      {
        path: 'job-types',
        component: JobTypesComponent
      },
      {
        path: 'work-types',
        component: WorkTypesComponent
      },
      {
        path: 'property-types',
        component: PropertyTypesComponent
      },
      {
        path: 'property-types',
        component: PropertyTypesComponent
      },
      {
        path: 'damage-types',
        component: DamageTypesComponent
      },
      {
        path: 'referral-types',
        component: ReferralTypesComponent
      },
      {
        path: 'payment-terms',
        component: JobPaymentTermsComponent
      },
      {
        path: 'document-categories',
        component: DocumentCategoriesComponent
      },
      {
        path: 'view-reports',
        component: ViewReportsComponent
      },
      {
        path: 'create-report',
        component: CreateReportComponent
      },
      {
        path: 'my-account',
        component: MyAccountComponent
      },
      {
        path: 'wip-processing',
        component: WipProcessingComponent
      }
    ]
  },
  {
    path: 'timecard',
    component: CreateTimeCardComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: '**',
    redirectTo: 'error/404'
  }
];

