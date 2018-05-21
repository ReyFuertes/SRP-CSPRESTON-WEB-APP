import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { JobService } from '../jobs/job.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { FormsModule } from '../forms/forms.module';
import { TimeCardService } from './timecard.service';
import { EmployeeService } from './employee.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { Select2Component } from 'angular-select2-component';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { DateService } from '../shared/services/date/date.service';
import { EllipsisPipe } from '../shared/pipes/ellipsis/ellipsis.pipe';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NumberService } from '../shared/services/number/number.service';
import { NotificationModule } from '../notifications/notification.module';
import { ComponentModule } from './../shared/components/component.module';
import { NotificationsService } from '../notifications/notifications.service';
import { GrowlModule, CalendarModule, PaginatorModule, TabMenuModule } from 'primeng/primeng';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { AuthenticationService } from '../authentication/authentication.service';
import { ReactiveFormsModule, FormsModule as NgFormsModule } from '@angular/forms';
import { ViewEmployeesComponent } from './view-employees/view-employees.component';
import { GeolocationService } from '../shared/services/location/geolocation.service';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { CreateTimeCardComponent } from './create-timecard/create-timecard.component';
import { ViewMyInvoicesComponent } from './view-my-invoices/view-my-invoices.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { ViewMyTimeCardsComponent } from './view-my-time-cards/view-my-time-cards.component';
import { EmployeeTimecardsComponent } from './employee-timecards/employee-timecards.component';
import { EmployeeTimeCardItemsComponent } from './employee-timecard-items/employee-timecard-items.component';

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
              AgmCoreModule.forRoot({
                apiKey: 'AIzaSyCnyerWdFRAKcE9KoeXE17jJsg9AQ6A1bI'
              }),
              ComponentModule,
              NgxDatatableModule,
              TableModule,
              PaginatorModule,
              TabMenuModule
            ],
            declarations: [
              ViewEmployeesComponent,
              EmployeeTimecardsComponent,
              CreateEmployeeComponent,
              CreateTimeCardComponent,
              ViewMyTimeCardsComponent,
              ViewMyInvoicesComponent,
              EmployeeTimeCardItemsComponent,
              EllipsisPipe,
              PdfViewerComponent,
              EmployeeFormComponent,
              EditEmployeeComponent
            ],
            entryComponents: [ ViewEmployeesComponent, EmployeeTimecardsComponent, CreateEmployeeComponent, CreateTimeCardComponent, ViewMyTimeCardsComponent,
                               ViewMyInvoicesComponent, EmployeeTimeCardItemsComponent ],
            providers: [
              NotificationsService,
              EmployeeService,
              JobService,
              TimeCardService,
              GeolocationService,
              DateService,
              AuthenticationService,
              NumberService,
              {
                provide: PERFECT_SCROLLBAR_CONFIG,
                useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
              }
            ]
          })
export class EmployeesModule {
}
