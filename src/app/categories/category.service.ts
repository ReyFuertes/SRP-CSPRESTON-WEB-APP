import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class CategoryService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  public listJobTypes() {
  	return this
    .http
    .get(`${environment.baseUrl}/api/job-types`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public createJobType(data) {
  	return this
    .http
    .post(`${environment.baseUrl}/api/job-type`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public updateJobType(data, id) {
  	return this
    .http
    .put(`${environment.baseUrl}/api/job-type/` + id, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public deleteJobType(id) {
  	return this
    .http
    .delete(`${environment.baseUrl}/api/job-type/` + id)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listWorkTypes() {
  	return this
    .http
    .get(`${environment.baseUrl}/api/work-types`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public createWorkType(data) {
  	return this
    .http
    .post(`${environment.baseUrl}/api/work-type`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public updateWorkType(data, id) {
  	return this
    .http
    .put(`${environment.baseUrl}/api/work-type/` + id, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public deleteWorkType(id) {
  	return this
    .http
    .delete(`${environment.baseUrl}/api/work-type/` + id)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listPropertyTypes() {
  	return this
    .http
    .get(`${environment.baseUrl}/api/property-types`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public createPropertyType(data) {
  	return this
    .http
    .post(`${environment.baseUrl}/api/property-type`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public updatePropertyType(data, id) {
  	return this
    .http
    .put(`${environment.baseUrl}/api/property-type/` + id, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public deletePropertyType(id) {
  	return this
    .http
    .delete(`${environment.baseUrl}/api/property-type/` + id)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listDamageTypes() {
  	return this
    .http
    .get(`${environment.baseUrl}/api/damage-types`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public createDamageType(data) {
  	return this
    .http
    .post(`${environment.baseUrl}/api/damage-type`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public updateDamageType(data, id) {
  	return this
    .http
    .put(`${environment.baseUrl}/api/damage-type/` + id, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public deleteDamageType(id) {
  	return this
    .http
    .delete(`${environment.baseUrl}/api/damage-type/` + id)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listReferralTypes() {
  	return this
    .http
    .get(`${environment.baseUrl}/api/referral-types`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public createReferralType(data) {
  	return this
    .http
    .post(`${environment.baseUrl}/api/referral-type`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public updateReferralType(data, id) {
  	return this
    .http
    .put(`${environment.baseUrl}/api/referral-type/` + id, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public deleteReferralType(id) {
  	return this
    .http
    .delete(`${environment.baseUrl}/api/referral-type/` + id)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listPaymentTerms() {
  	return this
    .http
    .get(`${environment.baseUrl}/api/job-payment-terms`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public createPaymentTerm(data) {
  	return this
    .http
    .post(`${environment.baseUrl}/api/job-payment-term`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public updatePaymentTerm(data, id) {
  	return this
    .http
    .put(`${environment.baseUrl}/api/job-payment-term/` + id, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public deletePaymentTerm(id) {
  	return this
    .http
    .delete(`${environment.baseUrl}/api/job-payment-term/` + id)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listDocumentCategories() {
    return this
    .http
    .get(`${environment.baseUrl}/api/document-categories`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public createDocumentCategory(data) {
    return this
    .http
    .post(`${environment.baseUrl}/api/document-category`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public updateDocumentCategory(data, id) {
    return this
    .http
    .put(`${environment.baseUrl}/api/document-category/` + id, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public deleteDocumentCategory(id) {
    return this
    .http
    .delete(`${environment.baseUrl}/api/document-category/` + id)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listJobStatus() {
    return this
    .http
    .get(`${environment.baseUrl}/api/job-statuses`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public createJobStatus(data) {
    return this
    .http
    .post(`${environment.baseUrl}/api/job-status`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public updateJobStatus(data, id) {
    return this
    .http
    .put(`${environment.baseUrl}/api/job-status/` + id, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public deleteJobStatus(id) {
    return this
    .http
    .delete(`${environment.baseUrl}/api/job-status/` + id)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

   public listLineItems() {
    return this
    .http
    .get(`${environment.baseUrl}/api/data/line_items`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listLineItemsData() {
    return this
    .http
    .get(`${environment.baseUrl}/api/data/line_item_list`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public createLineItem(data) {
    return this
    .http
    .post(`${environment.baseUrl}/api/line-items`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public updateLineItem(data, id) {
    return this
    .http
    .put(`${environment.baseUrl}/api/line-items/` + id, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public deleteLineItem(id) {
    return this
    .http
    .delete(`${environment.baseUrl}/api/line-items/` + id)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }
}

