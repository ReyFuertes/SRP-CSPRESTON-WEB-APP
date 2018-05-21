import { ContactTypeEmployeeComponent } from './components/contact-type-employee/contact-type-employee.component';
import { NgModule } from '@angular/core';
import { JobService } from './job.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CalendarModule, TabViewModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './../shared/shared.module';
import { JobAddComponent } from './add-job/add-job.component';
import { InvoiceService } from '../employees/invoice.service';
import { ContactService } from './../contacts/contact.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CategoryService } from '../categories/category.service';
import { JobEditComponent } from './edit-job/edit-job.component';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinancialService } from '../financials/financial.service';
import { ViewJobsComponent } from './view-jobs/view-jobs.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ComponentModule } from './../shared/components/component.module';
import { NotificationModule } from '../notifications/notification.module';
import { NotificationsService } from '../notifications/notifications.service';
import { JobDocumentsComponent } from './job-documents/job-documents.component';
import { JobTimeCardsComponent } from './job-timecards/job-timecards.component';
import { JobFinancialsComponent } from './job-financials/job-financials.component';
import { ContactTypeComponent } from './components/contact-type/contact-type.component';
import { JobInformationComponent } from './components/job-information/job-information.component';
import { JobTotalsComponent } from './job-financials/components/job-totals/job-totals.component';
import { AddJobTypeModalComponent } from './modals/add-job-type-modal/add-job-type-modal.component';
import { ContactTypeListComponent } from './components/contact-type-list/contact-type-list.component';
import { AddWorkTypeModalComponent } from './modals/add-work-type-modal/add-work-type-modal.component';
import { AddDamageTypeModalComponent } from './modals/add-damage-type-modal/add-damage-type-modal.component';
import { CustomerInformationComponent } from './components/customer-information/customer-information.component';
import { PaymentHistoryComponent } from './job-financials/components/payment-history/payment-history.component';
import { JobContactInformationComponent } from './components/contacts-information/contacts-information.component';
import { AddPaymentTermsModalComponent } from './modals/add-payment-terms-modal/add-payment-terms-modal.component';
import { AddPropertyTypeModalComponent } from './modals/add-property-type-modal/add-property-type-modal.component';
import { AddReferralTypeModalComponent } from './modals/add-referral-type-modal/add-referral-type-modal.component';
import { EstimatesOverviewComponent } from './job-financials/components/estimates-overview/estimates-overview.component';
import { InputDropdownSelectorComponent } from '../shared/components/input-dropdown-selector/input-dropdown-selector.component';
import { NumberService } from '../shared/services/number/number.service';
import { AutoCompleteModule, FileUploadModule, DataTableModule, DataListModule, DialogModule, TabMenuModule, CheckboxModule, InputMaskModule } from 'primeng/primeng';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        AutoCompleteModule,
        FileUploadModule,
        CalendarModule,
        ComponentModule,
        SharedModule,
        DataTableModule,
        DataListModule,
        NotificationModule.forRoot(),
        DialogModule,
        TabMenuModule,
        CheckboxModule,
        InputMaskModule,
        TableModule,
        PaginatorModule,
        TabViewModule
    ],
    declarations: [
        ContactTypeComponent,
        ContactTypeListComponent,
        JobContactInformationComponent,
        JobInformationComponent,
        CustomerInformationComponent,
        ViewJobsComponent,
        AddJobTypeModalComponent,
        AddWorkTypeModalComponent,
        JobTotalsComponent,
        AddPropertyTypeModalComponent,
        AddDamageTypeModalComponent,
        AddReferralTypeModalComponent,
        AddPaymentTermsModalComponent,
        JobTimeCardsComponent,
        JobDetailComponent,
        JobFinancialsComponent,
        JobDocumentsComponent,
        JobAddComponent,
        JobEditComponent,
        InputDropdownSelectorComponent,
        PaymentHistoryComponent,
        EstimatesOverviewComponent,
        ContactTypeEmployeeComponent
    ],
    providers: [
        JobService,
        ContactService,
        FinancialService,
        InvoiceService,
        NotificationsService,
        NumberService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class JobsModule {
}


