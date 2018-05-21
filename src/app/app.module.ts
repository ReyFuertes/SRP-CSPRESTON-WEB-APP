import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { Component, NgModule, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { SharedModule } from './shared/shared.module';
import { AuthService, Ng2UiAuthModule } from 'ng2-ui-auth';
import { RestangularModule } from 'ngx-restangular';
import { SRPConfig as SRPAuthConfig } from './shared/config/auth';
import { SRPConfig as SRPStorageConfig } from './shared/config/storage';
import { environment } from '../environments/environment';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { LocalStorageModule } from 'angular-2-local-storage';
import { RedirectIfLoggedInGuard } from './guards/redirect-if-logged-in/redirect-if-logged-in.guard';
import { RedirectIfNotLoggedInGuard } from './guards/redirect-if-not-logged-in/redirect-if-not-logged-in.guard';
import { RedirectIfNotAccountsPayableGuard } from './guards/redirect-if-not-accounts-payable/redirect-if-not-accounts-payable.guard';
import { RedirectIfNotAccountsReceivableGuard } from './guards/redirect-if-not-accounts-receivable/redirect-if-not-accounts-receivable.guard';
import { RedirectIfNotAdminGuard } from './guards/redirect-if-not-admin/redirect-if-not-admin.guard';
import { RedirectIfNotCrewGuard } from './guards/redirect-if-not-crew/redirect-if-not-crew.guard';
import { RedirectIfNotEstimatorGuard } from './guards/redirect-if-not-estimator/redirect-if-not-estimator.guard';
import { RedirectIfNotStaffGuard } from './guards/redirect-if-not-staff/redirect-if-not-staff.guard';
import { RedirectIfNotSuperIntendentGuard } from './guards/redirect-if-not-super-intendent/redirect-if-not-super-intendent.guard';
import { SocketIOService } from './shared/services/socket-io/socket-io.service';
import { PageLoadingService } from './shared/services/page-loading/page-loading.service';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';
import { RedirectIfLockedGuard } from './guards/redirect-if-locked/redirect-if-locked.guard';
import { TabModule } from './tab/tab.module';
import { TabProviderService } from './shared/services/tab-provider/tab-provider.service';
import { GlobalEventsService } from './shared/services/global-events/global-events.service';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalsModule } from './modals/modals.module';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignoutComponent } from './authentication/signin/signout.component';
import { ChangeComponent } from './authentication/change/change.component';
import { ForgotComponent } from './authentication/forgot/forgot.component';
import { LoggedInGuard } from './middlewares/logged-in-guard';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './middlewares/token.interceptor';
import { JsonInterceptor } from './middlewares/json.interceptor';
import { NotificationModule } from './notifications/notification.module';

export function createTranslateLoader (http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function RestangularConfigFactory (RestangularProvider, AuthService) {

  RestangularProvider.setBaseUrl(`${environment.baseUrl}/api`);

  if ( AuthService.isAuthenticated() ) {
    RestangularProvider.setDefaultHeaders({ 'Authorization': `Bearer ${AuthService.getToken()}` });
  }

  RestangularProvider.addFullRequestInterceptor((element, operation, path, url, headers, params) => {
    let bearerToken = AuthService.getToken();
    return {
      headers: Object.assign({}, headers, { Authorization: `Bearer ${bearerToken}` })
    };
  });
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: false,
  suppressScrollY: false,
  wheelSpeed: 1,
  wheelPropagation: false,
  swipeEasing: true,
  minScrollbarLength: null,
  maxScrollbarLength: null,
  useBothWheelAxes: false,
  scrollXMarginOffset: 0,
  scrollYMarginOffset: 0
  // stopPropagationOnClick: true
};

export const Layouts: any[] = [
  AdminLayoutComponent,
  AuthLayoutComponent
];

export const AngularModules: any[] = [
  BrowserModule,
  HttpClientModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  HttpModule
];

export const Guards: any[] = [
  RedirectIfLoggedInGuard,
  RedirectIfNotLoggedInGuard,
  RedirectIfNotAccountsPayableGuard,
  RedirectIfNotAccountsReceivableGuard,
  RedirectIfNotAdminGuard,
  RedirectIfNotCrewGuard,
  RedirectIfNotEstimatorGuard,
  RedirectIfNotStaffGuard,
  RedirectIfNotSuperIntendentGuard,
  RedirectIfLockedGuard,
  LoggedInGuard
];

export const TokenInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
};

export const JsonInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JsonInterceptor,
  multi: true
};

export const Interceptors: Provider[] = [
  TokenInterceptorProvider
];

@NgModule({
            declarations: [
              AppComponent,
              ...Layouts,
              SigninComponent,
              SignoutComponent,
              ForgotComponent,
              ChangeComponent
            ],
            imports: [
              ...AngularModules,
              SharedModule,
              RouterModule.forRoot(AppRoutes),
              TranslateModule.forRoot(
                {
                  loader: {
                    provide: TranslateLoader,
                    useFactory: (createTranslateLoader),
                    deps: [ Http ]
                  }
                }),
              NgbModule.forRoot(),
              SidebarModule.forRoot(),
              Ng2UiAuthModule.forRoot(SRPAuthConfig),
              RestangularModule.forRoot([ AuthService ], RestangularConfigFactory),
              SimpleNotificationsModule.forRoot(),
              LocalStorageModule.withConfig(SRPStorageConfig),
              MomentModule,
              NgIdleKeepaliveModule.forRoot(),
              TabModule.forRoot(),
              PerfectScrollbarModule,
              SweetAlert2Module.forRoot(),
              NgxDatatableModule,
              ModalsModule,
              NotificationModule.forRoot()
            ],
            providers: [
              Title, ...Guards, AuthService, SocketIOService, PageLoadingService,
              TabProviderService, GlobalEventsService,
              ...Interceptors,
              {
                provide: PERFECT_SCROLLBAR_CONFIG,
                useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
              }
            ],
            bootstrap: [
              AppComponent
            ]
          })
export class AppModule {
}
