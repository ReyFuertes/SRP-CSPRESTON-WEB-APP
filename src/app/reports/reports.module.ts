import { ComponentModule } from './../shared/components/component.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewReportsComponent } from './view-reports/view-reports.component';
import { CreateReportComponent } from './create-report/create-report.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentModule
  ],
  declarations: [ViewReportsComponent, CreateReportComponent],
  entryComponents: [ViewReportsComponent, CreateReportComponent]
})
export class ReportsModule { }
