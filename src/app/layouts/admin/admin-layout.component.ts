import { MenuItems, Menu } from './../../models/menu-items.model';
import {
  Component, OnInit, OnDestroy, ViewChild, HostListener, AnimationTransitionEvent, OnChanges
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd, NavigationExtras } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { LocalStorageService } from 'angular-2-local-storage';
import { $lockScreen } from '../../shared/config/urls';
import { TabItem } from '../../shared/interfaces/Menu';
import { TabProviderService } from '../../shared/services/tab-provider/tab-provider.service';
import { AuthenticationService } from '../../authentication/authentication.service';

export interface Options {
  heading?: string;
  removeFooter?: boolean;
  mapHeader?: boolean;
}

@Component({
             selector: 'app-layout',
             templateUrl: './admin-layout.component.html',
             styleUrls: [ './admin-layout.component.scss' ],
             providers: [
               AuthenticationService
             ]
           })
export class AdminLayoutComponent implements OnInit, OnDestroy, OnChanges {
  
  private _router: Subscription;
  public admin;
  public role;
  public menuItems: Menu[];
  
  currentLang = 'en';
  options: Options;
  theme = 'light';
  showSettings = false;
  isDocked = false;
  isBoxed = false;
  isOpened = true;
  mode = 'push';
  _mode = this.mode;
  _autoCollapseWidth = 991;
  width = window.innerWidth;
  timedOut = false;
  notificationOptions ={
    position:["top","right"],
    timeOut:3000,
    showProgressBar:true,
    pauseOnHover:true,
    lastOnBottom:false,
    clickToClose:true,
    maxLength:0,
    maxStack:10,
    preventDuplicates:true,
    preventLastDuplicates:'visible',
    rtl:false,
    animate:"scale"
  };
  
  /**
   * Registered tabs
   * @type {TabItem}
   */
  tabs: [ TabItem ];
  /**
   * Registered Contents for tabs, automatically populated by {@link TabProviderService}
   * @type {Component}
   */
  contents: [ any ];
  
  @ViewChild('sidebar') sidebar;
  
  constructor (public menuItemsList: MenuItems,
               private router: Router,
               private route: ActivatedRoute,
               public translate: TranslateService,
               private modalService: NgbModal,
               private titleService: Title,
               private idle: Idle,
               private keepalive: Keepalive,
               private localStorageService: LocalStorageService,
              //  public tabsProvider: TabProviderService,
               private authService: AuthenticationService) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    // this.tabs = this.tabsProvider.ref.tabs;
    // this.contents = this.tabsProvider.ref.contents;
//    this.tabsProvider.createTab(
//      {
//        id: 'job-12345',
//        active: false,
//        cmp: 'app-view-jobs',
//        name: 'Job #12345',
//        closeable: false
//      },[{action:'setText',arg:'Fancy string!'}]
//    );
//    this.localStorage.set('locked', false);
//    idle.setIdle(5);
//    idle.setTimeout(5);
//    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
//    idle.onTimeout.subscribe(() => {
//      this.localStorage.set('locked', true);
//      let params: NavigationExtras = {
//        queryParams: {
//          err: 'auth', msg: 'locked', t: +new Date(), ref: this.router.url
//        }
//      };
//      this.router.navigate([ $lockScreen ], params);
//    });
//    keepalive.interval(15);
//    this.idle.watch();

  }

  public gotoRoute(menu: Menu): void {
    const route = `/${menu.target}`;
    this.router.navigate([route.toLowerCase()]);
  }

  ngOnChanges () {
    // this.contents = this.tabsProvider.getContents();
  }
  
  ngOnInit (): void {

    if (this.authService.isAdmin()) {
       this.menuItems = this.menuItemsList.getAll();
    }

    if (this.authService.isCrew()) {
       this.menuItems = this.menuItemsList.getAllCrewMenu();
    }

    if (this.authService.isManager()) {
       this.menuItems = this.menuItemsList.getAllManagersMenu();
    }

    if ( this.isOver() ) {
      this._mode = 'over';
      this.isOpened = false;
    }

    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe(
      (event: NavigationEnd) => {
        // Scroll to top on view load
        document.querySelector('.main-content').scrollTop = 0;
        
        if ( this.isOver() || event.url === '/maps/fullscreen' ) {
          this.isOpened = false;
        }
        
        this.route.children.forEach((route: ActivatedRoute) => {
          let activeRoute: ActivatedRoute = route;
          while ( activeRoute.firstChild ) {
            activeRoute = activeRoute.firstChild;
          }
          this.options = activeRoute.snapshot.data;
        });
        
        if ( this.options.hasOwnProperty('heading') ) {
          this.setTitle(this.options.heading);
        }
      });
  }
  
  ngOnDestroy () {
    this._router.unsubscribe();
  }
  
  setTitle (newTitle: string) {
    this.titleService.setTitle(`${environment.pageTitle} | ${newTitle}`);
  }
  
  toogleSidebar (): void {
    if ( this._mode !== 'dock' ) {
      this.isOpened = !this.isOpened;
    }
  }
  
  isOver (): boolean {
    return window.matchMedia(`(max-width: 991px)`).matches;
  }
  
  openSearch (search) {
    this.modalService.open(search, { windowClass: 'search', backdrop: false });
  }
  
  addMenuItem (): void {
//    this.menuItems.add({
//      state: 'menu',
//      name: 'MENU',
//      type: 'sub',
//      icon: 'basic-webpage-txt',
//      children: [
//        {state: 'menu', name: 'MENU'},
//        {state: 'menu', name: 'MENU'}
//      ]
//    });
  }
  
  @HostListener('window:resize', [ '$event' ])
  onResize (event) {
    if ( this.width === event.target.innerWidth ) { return false; }
    if ( this.isOver() ) {
      this._mode = 'over';
      this.isOpened = false;
    } else {
      this._mode = this.mode;
      this.isOpened = true;
    }
    this.width = event.target.innerWidth;
  }
}
