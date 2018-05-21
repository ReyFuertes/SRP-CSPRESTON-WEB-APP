import {
  Component, OnChanges, AfterViewInit, OnDestroy, ViewContainerRef, ViewChild, Type,
  Input, ComponentFactoryResolver, Compiler, ComponentRef
} from '@angular/core';
import { TabProviderService } from '../../shared/services/tab-provider/tab-provider.service';
import { GlobalEventsService } from '../../shared/services/global-events/global-events.service';

@Component({
             selector: 'srp-cmp-resolver',
             templateUrl: './tab-resolver.component.html'
           })
export class TabResolverComponent implements OnChanges, AfterViewInit, OnDestroy {
  
  @ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;
  @Input() type: Type<Component>;
  cmpRef: ComponentRef<Component>;
  private isViewInitialized: boolean = false;
  
  constructor (private cmpFR: ComponentFactoryResolver, private tabsProvider: TabProviderService,
               private events: GlobalEventsService) {
  }
  
  updateComponent () {
    if ( !this.isViewInitialized ) {
      return;
    }
    if ( this.cmpRef ) {
      this.cmpRef.destroy();
    }
    
    let factory = this.cmpFR.resolveComponentFactory(this.type);
    setTimeout(() => {
      this.cmpRef = this.target.createComponent(factory);
      this.tabsProvider.setComponentReference(factory.selector, this.cmpRef);
      this.events.emit('tab-provider:component-ref-set', { selector: factory.selector, ref: this.cmpRef });
    });
    
    // to access the created instance use
    // this.compRef.instance.someProperty = 'someValue';
    // this.compRef.instance.someOutput.subscribe(val => doSomething());
  }
  
  ngOnChanges () {
    this.updateComponent();
  }
  
  ngAfterViewInit () {
    this.isViewInitialized = true;
    this.updateComponent();
  }
  
  ngOnDestroy () {
    if ( this.cmpRef ) {
      this.cmpRef.destroy();
    }
  }
  
}
