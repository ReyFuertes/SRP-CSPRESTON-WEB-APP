import { Injectable, ComponentRef, Component } from '@angular/core';
import * as _ from 'underscore';
import { LocalStorageService } from 'angular-2-local-storage';
import { AuthService } from 'ng2-ui-auth';
import { TabItem } from '../../interfaces/Menu';
import { Tabs } from '../../config/tabs';
import { TabbableComponents } from '../../config/tabbable-components';
import { GlobalEventsService } from '../global-events/global-events.service';

export interface ComponentAction {
  action: string,
  arg: string
}

@Injectable()
export class TabProviderService {
  /**
   * Reference of all open tabs and the corresponding content Components
   */
  ref: any = {
    tabs: [],
    contents: TabbableComponents
  };
  
  /**
   * Cache storage for Component References. The references are automatically moved to the global reference object
   */
  cmpRefs = {};
  
  /**
   * Available Tabs
   */
  private available: any;
  
  constructor (private lS: LocalStorageService, private auth: AuthService,
               private events: GlobalEventsService) {
    this.available = Tabs;
    let storedTabs: any = JSON.parse(this.lS.get('tabs'));
    storedTabs = storedTabs && storedTabs.length > 0 ? storedTabs : [];
    
    let user = JSON.parse(localStorage.getItem('user'));
    let role = user.role_name;

    if ( storedTabs.length > 0 ) {
      for ( let tab of storedTabs ) {
        let newTab = this.availableTab(tab);
        if ( newTab ) {
          if ( !this.tabExists(tab) ) {
            this.addTab(newTab);
          }
        }
        let activeTab = null;

        if ( activeTab = this.lS.get('active-tab') ) {
          if ( Array.isArray(activeTab) ) {
            activeTab = activeTab[ 0 ];
          }

          if (role == 'ROLE_CREW') {
            activeTab = 'timerecord';
            this.tabAction('open', 'new', {type: activeTab}, null);
          } 
          else if (role == 'ROLE_SUPERINTENDENT' || role == 'ROLE_ESTIMATOR' || role == 'ROLE_AP_MANAGER') {
            activeTab = 'employee-timecards';
            this.tabAction('open', 'new', {type: activeTab}, null);
          }  
          else {
            this.tabAction('change-active', activeTab, null, null);
          }
        }
      }
    } else {
      let tab = 'dashboard'; 

      if (role == 'ROLE_CREW') {
        tab = 'timerecord';
      } else if (role == 'ROLE_SUPERINTENDENT' || role == 'ROLE_ESTIMATOR' || role == 'ROLE_AP_MANAGER') {
        tab = 'employee-timecards';
      }

      let newTab = this.availableTab(tab);
      if ( newTab ) {
        if ( !this.tabExists(tab) ) {
          this.addTab(newTab, true);
        }
      }
    }

    // Subscribe to events for creating new tabs
    this.events.events$.filter(event => event.name === 'tab-provider:create-tab').subscribe(event => {
      this.createTab(event.data.tab, event.data.calls);
    });
    
    // Subscribe to events for executing tab actions
    this.events.events$.filter(event => event.name === 'tab-provider:tab-action').subscribe(event => {
      this.tabAction(event.data.action, event.data.target, event.data.data, event.data.instance);
    });

  }
  
  /**
   * Create a new tab, and optionally call functions on the newly created tab
   * @param tab
   * @param calls
   */
  createTab (tab: TabItem, calls: [ ComponentAction ] = null): void {
    this.available.push(tab);
    let newTab = this.availableTab(tab.id);
    if ( newTab ) {
      if ( !this.tabExists(tab.id) ) {
        this.addTab(newTab, true, { tab: tab, calls: calls });
      } else {
        this.tabAction('change-active', tab.id, null, null);
      }
    }
    this.events.events$.filter(event => event.name === 'tab-provider:component-ref-set').subscribe(event => {
      let cmpRef = this.getComponentReference(tab.id);
      if ( typeof cmpRef !== 'undefined' && cmpRef !== null ) {
        let instance = cmpRef.instance;
        for ( let call of calls ) {
          if ( instance[ call.action ] && typeof instance[ call.action ] === 'function' ) {
            instance[ call.action ](call.arg);
          }
        }
      }
    });
  }
  
  /**
   * Return a list of all tabs that are currently registered
   * @returns {Array}
   */
  getTabs () {
    return this.ref.tabs;
  }
  
  /**
   * Return the tab contents that have been auto-registered
   * @returns {any}
   */
  getContents () {
    return this.ref.contents;
  }
  
  /**
   * Register new tab and optionally set it as active
   * @param tab {TabItem}
   * @param setActive {boolean}
   */
  addTab (tab: TabItem, setActive: boolean = false, ref: any = null, calls: any[] = []) {
    this.ref.tabs.push(tab);
    let cmpRef = null;
    if ( typeof this.cmpRefs[ tab.cmp ] !== 'undefined' && this.cmpRefs[ tab.cmp ] !== null ) {
      cmpRef = this.ref.tabs[ this.ref.tabs.indexOf(tab) ].cmpRef = this.cmpRefs[ tab.cmp ];
    }
    this.addTabToStorage(tab.id);
    if ( setActive ) {
      this.lS.set('active-tab', tab.id);
      this.tabAction('change-active', tab.id, null, null);
    }

     this.events.events$.filter(event => event.name === `tab-provider:component-ref-set:${tab.id}`).subscribe(
        event => {
          if ( calls && Array.isArray(calls) ) {
            let cmpRef = event.data.ref;
            if ( typeof cmpRef !== 'undefined' && cmpRef !== null ) {
              let instance = cmpRef.instance;
              for ( let call of calls ) {
                if ( instance[ call.action ] && typeof instance[ call.action ] === 'function' ) {
                  instance[ call.action ](call.arg);
                }
              }
            }
          }
        });


    return cmpRef ? cmpRef : null;
  }
  
  /**
   * Add tab to local storage
   * @param value
   */
  addTabToStorage (value) {
    let el = 'tabs';
    let currentEl: any = JSON.parse(this.lS.get(el));
    if ( currentEl === null || typeof currentEl === 'undefined' ) {
      currentEl = [];
    }
    if ( currentEl.indexOf(value) < 0 ) {
      currentEl.push(value);
      this.lS.set(el, JSON.stringify(currentEl));
    }
  }
  
  /**
   * Remove tab from local storage
   * @param value
   */
  removeTabFromStorage (value) {
    let el = 'tabs';
    let currentEl: any = JSON.parse(this.lS.get(el));
    if ( currentEl === null || typeof currentEl === 'undefined' ) {
      return;
    }
    currentEl.splice(currentEl.indexOf(value), 1);
    this.lS.set(el, JSON.stringify(currentEl));
  }
  
  /**
   * Remove a registered tab
   * @param tabId
   */
  removeTab (tabId: string) {
    let tabToRemove: any = _.where(this.ref.tabs, { id: tabId })[ 0 ];
    if ( tabToRemove.active ) {
      this.tabAction('change-active', this.ref.tabs[ this.ref.tabs.indexOf(tabToRemove) - 1 ].id, null, null);
    }
    this.ref.tabs.splice(this.ref.tabs.indexOf(tabToRemove), 1);
    this.removeTabFromStorage(tabId);
  }
  
  /**
   * Check whether a tab has been registered
   * @param tabId {string}
   * @returns {boolean}
   */
  tabExists (tabId: string) {
    let tab: any = _.where(this.ref.tabs, { id: tabId });
    return tab.length > 0;
  }
  
  /**
   * Check whether a tab is available (based on ID)
   * @param tabId {string}
   * @returns {boolean}
   */
  availableTab (tabId: string) {
    let tab: any = _.where(this.available, { id: tabId });
    return tab.length > 0 ? tab[ 0 ] : false;
  }
  
  /**
   * Set the component reference for a registered tab
   * If the tab hasn't been registered yet, the reference will be
   * moved into the cache for later use. A 'tab-provider:component-ref-set'
   * event is fired once the reference has been set
   * @param selector
   * @param ref
   */
  setComponentReference (selector: string, ref: ComponentRef<Component>) {
    let tab: any = _.where(this.ref.tabs, { cmp: selector });
    if ( tab.length > 0 ) {
      tab[ tab.length - 1 ].cmpRef = ref;
    } else {
      this.cmpRefs[ selector ] = ref;
    }
  }
  
  /**
   * Get the component reference for a registered tab
   * to obtain the component reference, you must first subscribe to the
   * 'tab-provider:component-ref-set' event otherwise the reference might
   * not be available yet
   * @param id
   * @returns {ComponentRef<Component>}
   */
  getComponentReference (id: string) {
    let tab: any = _.where(this.ref.tabs, { id: id });
    if ( tab && tab.length > 0 ) {
      let ref = tab[ 0 ];
      return ref.cmpRef ? ref.cmpRef : null;
    }
  }

  delegateCallAction (tab: any, calls: ComponentAction[] = []) {
    let cmpRef = null;
    if ( this.getComponentReference(tab) ) {
      this.callActionOnTab(this.getComponentReference(tab), calls);
    } else {
      this.events.events$.filter(event => event.name === `tab-provider:component-ref-set:${tab.id}`).subscribe(
        event => {
          this.callActionOnTab(event.data.ref, calls);
        });
    }
  }
  
  callActionOnTab (cmpRef: ComponentRef<Component>, calls: ComponentAction[] = []) {
    if ( cmpRef ) {
      if ( calls && Array.isArray(calls) ) {
        if ( typeof cmpRef !== 'undefined' && cmpRef !== null ) {
          let instance = cmpRef.instance;
          for ( let call of calls ) {
            if ( instance[ call.action ] && typeof instance[ call.action ] === 'function' ) {
              instance[ call.action ](call.arg);
            }
          }
        }
      }
    }
  }
  
  /**
   * Execute a tab action
   * @param action {string} The action to perform
   * @param target {string} The target identifier
   * @param data {any} An optional Object of data to pass through the component
   * @param instance {any} The current tab instance
   */
  tabAction (action: string, target: string, data: any, instance: any) {
    
    if ( action === 'open' && target === 'new' ) {
      let newTab = this.availableTab(data.type);
      if ( newTab ) {
        if ( !this.tabExists(data.type) ) {
          this.addTab(newTab, true, null, data.call);
        } else {
          this.tabAction('change-active', newTab.id, null, null);
          this.delegateCallAction(newTab, data.call);
        }
      }
    }
    if ( action === 'close' && target === 'self' ) {
      this.removeTab(instance);
    }
    if ( action === 'change-active' ) {
      _.map(this.ref.tabs, (tab: any) => {
        tab.active = false;
      });
      let newActiveTab: any = _.where(this.ref.tabs, { id: target })[ 0 ];
      if ( typeof newActiveTab !== 'undefined' && newActiveTab !== null ) {
        newActiveTab.active = true;
        this.lS.set('active-tab', newActiveTab.id);
      }
    }
    if ( action === 'execute' ) {
      if ( target === 'logout' ) {
        this.auth.logout();
      }
    }
  }
}
