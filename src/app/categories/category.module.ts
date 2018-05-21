import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineItemsComponent } from './line-items/line-items.component';
import { WorkTypesComponent } from './work-types/work-types.component';
import { JobTypesComponent } from './job-types/job-types.component';
import { DamageTypesComponent } from './damage-types/damage-types.component';
import { ReferralTypesComponent } from './referral-types/referral-types.component';
import { PropertyTypesComponent } from './property-types/property-types.component';
import { JobPaymentTermsComponent } from './payment-terms/payment-terms.component';
import { DocumentCategoriesComponent } from './document-categories/document-categories.component';
import { JobStatusComponent } from './job-status/job-status.component';
import { ReactiveFormsModule,FormsModule as NgFormsModule } from '@angular/forms';
import { FormsModule } from '../forms/forms.module';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { CalendarModule } from 'primeng/primeng';
import { ComponentModule } from './../shared/components/component.module';
import { CategoryService } from './category.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationModule } from '../notifications/notification.module';
import { TableModule } from 'primeng/table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
 
@NgModule({
            imports: [
              NotificationModule.forRoot(),
              CommonModule,
              ReactiveFormsModule,
              FormsModule,
              NgFormsModule,
              NgbTabsetModule,
              PerfectScrollbarModule,
              SweetAlert2Module,
              CalendarModule,
              ComponentModule,
              TableModule,
              NgxDatatableModule
            ],
            declarations: [
              LineItemsComponent,
              WorkTypesComponent,
              JobTypesComponent,
              DamageTypesComponent,
              PropertyTypesComponent,
              ReferralTypesComponent,
              JobPaymentTermsComponent,
              DocumentCategoriesComponent,
              JobStatusComponent
            ],
            entryComponents: [ WorkTypesComponent, JobTypesComponent, DamageTypesComponent, PropertyTypesComponent, ReferralTypesComponent, JobPaymentTermsComponent, DocumentCategoriesComponent, JobStatusComponent ],
            providers: [ 
              CategoryService, 
              NotificationsService,
              {
                provide: PERFECT_SCROLLBAR_CONFIG,
                useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
              }
            ]
          })
export class CategoriesModule {
}
