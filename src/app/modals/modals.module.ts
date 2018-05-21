import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordModalComponent } from './account/change-password-modal/change-password-modal.component';
import { ChangeEmailModalComponent } from './account/change-email-modal/change-email-modal.component';
import { ManageContactsModalComponent } from './job/manage-contacts-modal/manage-contacts-modal.component';
import { AddContactModalComponent } from './job/add-contact-modal/add-contact-modal.component';
import { AddressInfoModalComponent } from './job/address-info-modal/address-info-modal.component';
import { JobDetailsInfoModalComponent } from './job/job-details-info-modal/job-details-info-modal.component';
import { NotesInfoModalComponent } from './job/notes-info-modal/notes-info-modal.component';
import { EmailsInfoModalComponent } from './job/emails-info-modal/emails-info-modal.component';
import { ContactsInfoModalComponent } from './job/contacts-info-modal/contacts-info-modal.component';
import { DocumentsInfoModalComponent } from './job/documents-info-modal/documents-info-modal.component';
import { AddDocumentsCategoryModalComponent } from './job/add-documents-category-modal/add-documents-category-modal.component';
import { UploadDocumentModalComponent } from './job/upload-document-modal/upload-document-modal.component';
import { TemplatesInfoModalComponent } from './job/templates-info-modal/templates-info-modal.component';
import { JobTotalsInfoModalComponent } from './job/job-totals-info-modal/job-totals-info-modal.component';
import { EstimateInfoModalComponent } from './job/estimate-info-modal/estimate-info-modal.component';
import { EnterEstimateOrBudgetModalComponent } from './job/enter-estimate-or-budget-modal/enter-estimate-or-budget-modal.component';
import { AllocatePendingCostsModalComponent } from './job/allocate-pending-costs-modal/allocate-pending-costs-modal.component';
import { IssueInvoiceModalComponent } from './job/issue-invoice-modal/issue-invoice-modal.component';

@NgModule({
            imports: [
              CommonModule
            ],
            declarations: [ ChangePasswordModalComponent, ChangeEmailModalComponent,
                            ManageContactsModalComponent, AddContactModalComponent, AddressInfoModalComponent,
                            JobDetailsInfoModalComponent, NotesInfoModalComponent, EmailsInfoModalComponent,
                            ContactsInfoModalComponent, DocumentsInfoModalComponent, AddDocumentsCategoryModalComponent,
                            UploadDocumentModalComponent, TemplatesInfoModalComponent, JobTotalsInfoModalComponent,
                            EstimateInfoModalComponent,
                            EnterEstimateOrBudgetModalComponent,
                            AllocatePendingCostsModalComponent,
                            IssueInvoiceModalComponent ]
          })
export class ModalsModule {
}
