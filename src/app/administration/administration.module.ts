import { ComponentModule } from './../shared/components/component.module';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MyAccountComponent} from './my-account/my-account.component';
import {WipProcessingComponent} from './wip-processing/wip-processing.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, ComponentModule
  ],
  declarations: [
    MyAccountComponent, WipProcessingComponent
  ],
  entryComponents: [MyAccountComponent, WipProcessingComponent]
})
export class AdministrationModule {}