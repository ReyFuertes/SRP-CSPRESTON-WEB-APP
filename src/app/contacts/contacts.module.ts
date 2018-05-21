import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/paginator';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentModule } from './../shared/components/component.module';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { ViewContactsComponent } from './view-contacts/view-contacts.component';
import { ContactInvoicesComponent } from './contact-invoices/contact-invoices.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    NgxDatatableModule,
    ComponentModule,
    TableModule,
    PaginatorModule
  ],
  declarations: [
    ViewContactsComponent,
    ContactInvoicesComponent,
    ContactFormComponent,
    EditContactComponent,
    CreateContactComponent
  ],
  entryComponents: [ 
    ViewContactsComponent, 
    ContactInvoicesComponent
  ]
})

export class ContactsModule {
}
