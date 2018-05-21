import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';
import { TabResolverComponent } from './tab-resolver/tab-resolver.component';
import { PortalTabComponent } from './portal-tab/portal-tab.component';
import { TabProviderService } from '../shared/services/tab-provider/tab-provider.service';
import { DashboardModule } from '../dashboard/dashboard.module';
import { JobsModule } from '../jobs/jobs.module';
import { AdministrationModule } from '../administration/administration.module';
import { ContactsModule } from '../contacts/contacts.module';
import { EmployeesModule } from '../employees/employees.module';
import { FinancialsModule } from '../financials/financials.module';
import { ReportsModule } from '../reports/reports.module';
import { RolesModule } from '../roles/role.module';
import { CategoriesModule } from '../categories/category.module';

@NgModule({
            imports: [
              CommonModule, DashboardModule, JobsModule, AdministrationModule, ContactsModule, EmployeesModule,
              FinancialsModule, ReportsModule, RolesModule, CategoriesModule
            ],
            declarations: [ TabsContainerComponent, TabResolverComponent, PortalTabComponent ],
            exports: [ TabsContainerComponent, TabResolverComponent, PortalTabComponent ]
          })
export class TabModule {
  public static forRoot (): ModuleWithProviders {
    return {
      ngModule: TabModule,
      providers: [ TabProviderService ]
    };
  }
}
