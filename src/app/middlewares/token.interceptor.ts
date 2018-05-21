import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, 
  HttpResponse, 
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthenticationService } from '../authentication/authentication.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  public isRefreshingToken: boolean = false;
  public tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('ng2-ui-auth_token'));

  constructor(private injector: Injector, private notificationService: NotificationsService) {

  }

  addToken(req: HttpRequest<any>) {
      return req.clone({ setHeaders: { Authorization: `Bearer ${localStorage.getItem('ng2-ui-auth_token')}` }, responseType: 'text' })
  }

  addTokenRefresh(req: HttpRequest<any>) {
      return req.clone({ setHeaders: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }, responseType: 'text' })
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) { 
    let token = (req.url.indexOf('api/refresh') >= 0) ? this.addTokenRefresh(req) : this.addToken(req);

    return next
        .handle(token)
        .map(response => {
          if (response instanceof HttpResponse) {
            response = response.clone<any>({ body: JSON.parse(response.body) });
          }

          return response;
        })
        .catch(error => {
            const parsedError = Object.assign({}, error, { error: JSON.parse(error.error) });
            
            if (error instanceof HttpErrorResponse) {
                switch ((<HttpErrorResponse>error).status) {
                    case 400:
                      return this.handle400Error(new HttpErrorResponse(parsedError));
                    case 401:
                      if (req.url.indexOf('api/login') < 0) {
                        return this.handle401Error(req, next);
                      } 
                    default:
                      return this.handleError(new HttpErrorResponse(parsedError));
                }
            } else {
                return Observable.throw(new HttpErrorResponse(parsedError));
            }
        });
  }

  protected handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    let authService = this.injector.get(AuthenticationService);

    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);

      return authService
        .refreshToken()
        .map((resp: any) => {
            if (resp.token) {

                localStorage.setItem('ng2-ui-auth_token', resp.token);
                localStorage.setItem('auth_token', resp.token);
                this.tokenSubject.next(resp.token);

                this.notificationService.success('Expired token renewed.');

                setTimeout(() => {
                  window.location.reload();
                }, 2000);

                return next.handle(this.addToken(req));
            }

            // If we don't get a new token, we are in trouble so logout.
            return this.logoutUser();
        })
        .catch(error => {
            console.log(error);

            // If there is an exception calling 'refreshToken', bad news so logout.
            return this.logoutUser();
        })
        .finally(() => {
            this.isRefreshingToken = false;
        });
    } else {
      return this.tokenSubject
        .filter(token => token != null)
        .take(1)
        .switchMap(token => {
            return next.handle(this.addToken(req));
        });
    }
  }

  protected handle400Error(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
        // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
        return this.logoutUser();
    }

    return Observable.throw(error);
    }

  protected handleError(error) {
    return Observable.throw(error);
  }

  protected logoutUser() {
    let router = this.injector.get(Router);
    this.notificationService.error('Token has expired');

    setTimeout(() => {
      router.navigate(['/logout']);
    }, 2000);

    return Observable.throw("");
  }
}
