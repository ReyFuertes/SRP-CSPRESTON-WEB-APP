import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Contact } from './contact.model';
import { Injectable } from '@angular/core';
import { Contact as ContactModel } from '../models/contact.model';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ContactService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  public getAllJobContacts(): Observable<any> {
    return this
      .http
      .get(`${environment.baseUrl}/api/data/contact_object_list`)
      .map((res) => res)
      .catch((err) => {
        return Observable.throw(err.json());
      });
  }

  public list(filter?: string) {
    if (filter === undefined) {
      filter = '';
    }

    return this
    .http
    .get(`${environment.baseUrl}/api/contacts` + filter)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public create(contact: any) {
    return this
    .http
    .post(`${environment.baseUrl}/api/contact`, contact)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public createContact(contact: any) {

    return this
    .http
    .post(`${environment.baseUrl}/api/contacts`, contact)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public update(contact: Contact, id: number) {

    return this
    .http
    .put(`${environment.baseUrl}/api/contact/` + id, contact)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public updateContact(contact: ContactModel, id: number) {

    return this
    .http
    .patch(`${environment.baseUrl}/api/contacts/` + id, contact)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public delete(id: number) {

    return this
    .http
    .delete(`${environment.baseUrl}/api/contact/` + id)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }
  public getContactTypes() {

    return this
    .http
    .get(`${environment.baseUrl}/api/data/contact_types`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public getCustomerTypes() {
    return this
    .http
    .get(`${environment.baseUrl}/api/contacts/customer-types`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listEmployees() {

    return this
    .http
    .get(`${environment.baseUrl}/api/contact?filter=employees`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public show(id: number) {

    return this
    .http
    .get(`${environment.baseUrl}/api/contacts/` + id)
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

  public listEmployeePrimaryRoles() {
    return this
    .http
    .get(`${environment.baseUrl}/api/employee-roles/primary`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public getEmployeeJobRole(id) {
    return this
    .http
    .get(`${environment.baseUrl}/api/jobs/` + id + `/contacts`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listContactRoles() {
    return this
    .http
    .get(`${environment.baseUrl}/api/data/contact_roles`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public getSubcontratorRoles() {
    return this
    .http
    .get(`${environment.baseUrl}/api/subcontractor-role`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listCustomerByType(type: string) {
    if (type === 'Company') {
      return this
      .http
      .get(`${environment.baseUrl}/api/contacts/companies`)
      .map((res) => res)
      .catch((err) =>  {
        return Observable.throw(err.json());
      });
    } else {
      return this
      .http
      .get(`${environment.baseUrl}/api/contacts/persons`)
      .map((res) => res)
      .catch((err) =>  {
        return Observable.throw(err.json());
      });
    }
  }

  public getCompanies(typeId?: number) {
    let url = `${environment.baseUrl}/api/data/contact_list?contact_type=COMPANY`;

    if (typeId > 0) {
      url += `&type_id=${typeId}`
    }

    return this
      .http
      .get(url)
      .map((res) => res)
      .catch((err) =>  {
        return Observable.throw(err.json());
      });
  }
}

