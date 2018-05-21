import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {

  public role = null;
  public name = null;
  public user = null;
  public access_level = null;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {

    this.checkRole();
  } 

  protected checkRole() {
    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      this.name = localStorage.getItem('name');
      this.user = user;
      this.role = user.role_name;
      this.access_level = user.access_level;
      return this.role;
    }
  } 

  public refreshToken(): Observable<string> {
     
   return this
    .http
    .post(`${environment.baseUrl}/api/refresh`, {})
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.error);
    });
  }

  public change(data) {

    return this
    .http
    .post(`${environment.baseUrl}/api/password/change`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.error);
    });
  }

  public validate(token, email) {

    return this
    .http
    .post(`${environment.baseUrl}/api/validate-token`, {token: token, email: email})
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.error);
    });
  }

  public forgot(email) {

    return this
    .http
    .post(`${environment.baseUrl}/api/forgot_password`, {email: email})
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.error);
    });
  }

  public logout() {
    return this
    .http
    .post(`${environment.baseUrl}/api/logout`, {})
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.error);
    }); 
  }

  /**
   * Check roles
   */

  public isManager()
  {
    return (
        this.isAPManager()
        || this.isSuper()
        || this.isEstimator()
    )
  }
  
  public isAdmin() {
    this.checkRole();
    return this.role == 'ROLE_ADMIN';
  }

  public isSuper() {
    return this.checkRole() == 'ROLE_SUPERINTENDENT';
  }

  public isEstimator() {
    return this.checkRole() == 'ROLE_ESTIMATOR';
  }

  public isCrew() {
    return this.checkRole() == 'ROLE_CREW';
  }

  public isAPManager() {
    return this.checkRole() == 'ROLE_AP_MANAGER';
  }

  public isARManager() {
    return this.checkRole() == 'ROLE_AR_MANAGER';
  }

  public isStaff() {
    return this.checkRole() == 'ROLE_STAFF';
  }

  public is_admin()
  {
    return this.access_level == 'ADMIN';
  }

  public is_manager_up()
  {
    return this.is_admin() || this.access_level == 'MANAGER';
  }


}

