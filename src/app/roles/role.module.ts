import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRolesComponent } from './contact-roles/contact-roles.component';
import { EmployeeRolesComponent } from './employee-roles/employee-roles.component';
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
import { RoleService } from './role.service';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationModule } from '../notifications/notification.module';
import {SubcontractorRolesComponent} from './subcontractor-roles/subcontractor-roles.component';

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
              ComponentModule
            ],
            declarations: [
              ContactRolesComponent,
              EmployeeRolesComponent,
              SubcontractorRolesComponent,
            ],
            entryComponents: [ ContactRolesComponent, EmployeeRolesComponent, SubcontractorRolesComponent ],
            exports : [

            ],
            providers: [ 
            RoleService, 
            NotificationsService,
            {
              provide: PERFECT_SCROLLBAR_CONFIG,
              useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
            }  
            ]
          })
export class RolesModule {
}
