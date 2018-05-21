import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEstimateComponent } from './create-estimate/create-estimate.component';
import { EditEstimateComponent } from './edit-estimate/edit-estimate.component';
import { EstimateFormComponent } from './estimate-form/estimate-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobService } from '../jobs/job.service';
import { FinancialService } from './financial.service';
import { SharedService } from '../shared/services/shared.service';
import { Select2Component } from 'angular-select2-component';
import { ComponentModule } from './../shared/components/component.module';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationModule } from '../notifications/notification.module';
import { NumberService } from '../shared/services/number/number.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentModule,
    NotificationModule.forRoot()
  ],
  declarations: [
    CreateEstimateComponent,
    EditEstimateComponent,
    EstimateFormComponent
  ],
  entryComponents: [
    CreateEstimateComponent
  ],
  providers: [
      JobService,
      FinancialService,
      SharedService,
      NotificationsService,
      NumberService
    ]
})
export class FinancialsModule { }
