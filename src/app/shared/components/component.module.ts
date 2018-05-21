import { NgModule } from '@angular/core';
import {GrowlModule, TabMenuModule} from 'primeng/primeng';
import { IboxComponent } from './ibox/ibox.component';
import { BrowserModule } from '@angular/platform-browser';
import { Select2Component } from 'angular-select2-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressesComponent } from './addresses/addresses.component';
import { EmailFormComponent } from './email-form/email-form.component';
import { PhoneFormComponent } from './phone-form/phone-form.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { NotificationModule } from '../../notifications/notification.module';
import { AddressFormComponent } from './address-form/address-form.component';
import { SearchSelectorComponent } from './search-selector/search-selector.component';
import { SRPDropdownSelectorComponent } from './dropdown-selector/dropdown-selector.component';
import { JobsTabmenuComponent } from './jobs-tabmenu/jobs-tabmenu.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        GrowlModule,
        NotificationModule.forRoot(),
        ReactiveFormsModule,
        TabMenuModule,
    ],
    declarations: [
        AddressesComponent,
        IboxComponent,
        BreadcrumbsComponent,
        SRPDropdownSelectorComponent,
        SearchSelectorComponent,
        Select2Component,
        PhoneFormComponent,
        EmailFormComponent,
        AddressFormComponent,
        JobsTabmenuComponent
    ],
    exports: [
        IboxComponent,
        BreadcrumbsComponent,
        SRPDropdownSelectorComponent,
        SearchSelectorComponent,
        AddressesComponent,
        Select2Component,
        PhoneFormComponent,
        EmailFormComponent,
        AddressFormComponent,
        JobsTabmenuComponent
    ]
})
export class ComponentModule { }

