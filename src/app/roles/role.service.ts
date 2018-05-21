import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class RoleService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  public listContactRoles() {

    return this
    .http
    .get(`${environment.baseUrl}/api/contact-role`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listEmployeeRoles() {

    return this
    .http
    .get(`${environment.baseUrl}/api/employee-role`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public createContactRole(data) {

    return this
    .http
    .post(`${environment.baseUrl}/api/contact-role`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public updateContactRole(role: any, id: number) {

    return this
    .http
    .put(`${environment.baseUrl}/api/contact-role/` + id, role)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public deleteContactRole(id: number) {

    return this
    .http
    .delete(`${environment.baseUrl}/api/contact-role/` + id)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public createEmployeeRole(data) {

    return this
    .http
    .post(`${environment.baseUrl}/api/employee-role`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public updateEmployeeRole(role: any, id: number) {

    return this
    .http
    .put(`${environment.baseUrl}/api/employee-role/` + id, role)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public deleteEmployeeRole(id: number) {

    return this
    .http
    .delete(`${environment.baseUrl}/api/employee-role/` + id)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listUserRoles() {

    return this
    .http
    .get(`${environment.baseUrl}/api/roles`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listSubcontractorRoles() {

    return this
        .http
        .get(`${environment.baseUrl}/api/subcontractor-role`)
        .map((res) => res)
        .catch((err) =>  {
          return Observable.throw(err.json());
        });
  }

  public createSubcontractorRole(data) {

    return this
        .http
        .post(`${environment.baseUrl}/api/subcontractor-role`, data)
        .map((res) => res)
        .catch((err) =>  {
          return Observable.throw(err.json());
        });
  }

  public updateSubcontractorRole(role: any, id: number) {

    return this
        .http
        .put(`${environment.baseUrl}/api/subcontractor-role/` + id, role)
        .map((res) => res)
        .catch((err) =>  {
          return Observable.throw(err.json());
        });
  }

  public deleteSubcontractorRole(id: number) {

    return this
        .http
        .delete(`${environment.baseUrl}/api/subcontractor-role/` + id)
        .map((res) => res)
        .catch((err) =>  {
          return Observable.throw(err.json());
        });
  }
}

