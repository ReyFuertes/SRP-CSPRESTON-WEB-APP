import {MenuItems} from './../models/menu-items.model';
import {NgModule} from '@angular/core';
import {AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective} from './accordion';
import {ToggleFullscreenDirective} from './fullscreen/toggle-fullscreen.directive';

@NgModule({
  declarations: [
    AccordionAnchorDirective, 
    AccordionLinkDirective, 
    AccordionDirective, 
    ToggleFullscreenDirective
  ],
  exports: [
    AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective, ToggleFullscreenDirective
  ],
  providers: [MenuItems]
})
export class SharedModule {}