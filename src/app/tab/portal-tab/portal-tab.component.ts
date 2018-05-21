import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { TabProviderService } from '../../shared/services/tab-provider/tab-provider.service';

@Component({
  selector: '[portal-tab]',
  templateUrl: './portal-tab.component.html'
})
export class PortalTabComponent implements OnInit {
  @Input() tabId:string;
  @Input() tabName:string;
  @Input() tabIcon:string;
  @Input() tabCloseable:boolean;
  @HostListener('click', ['$event']) onClickItem() {this.tabAction('change-active',this.tabId,null)}
  constructor(private tabsProvider:TabProviderService) { }

  ngOnInit() {
  }

  tabAction(action:string,target:string,data:any = null, tabId = this.tabId){
    this.tabsProvider.tabAction(action,target,data,tabId);
  }
}
