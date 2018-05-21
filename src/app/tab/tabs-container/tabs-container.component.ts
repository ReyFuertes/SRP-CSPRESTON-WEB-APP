import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import * as _ from 'underscore';
import { TabProviderService } from '../../shared/services/tab-provider/tab-provider.service';

@Component({
  selector: 'srp-tabs-container',
  templateUrl: './tabs-container.component.html'
})
export class TabsContainerComponent implements OnInit {
  @Input() tabs;
  
  constructor(private cmpFR: ComponentFactoryResolver,private tabsProvider:TabProviderService) { }

  ngOnInit() {
  
  }
  
  isActiveTab(tab){
    let factory = this.cmpFR.resolveComponentFactory( this.tabs[this.tabs.indexOf(tab)] );
    let activeTab:any = _.where(this.tabsProvider.getTabs(),{active:true,cmp:factory.selector});
    return activeTab.length > 0;
  }
  
  isRegisteredComponent(tab){
    let factory = this.cmpFR.resolveComponentFactory( this.tabs[this.tabs.indexOf(tab)] );
    let activeTab:any = _.where(this.tabsProvider.getTabs(),{cmp:factory.selector});
    return activeTab.length > 0;
  }

}
