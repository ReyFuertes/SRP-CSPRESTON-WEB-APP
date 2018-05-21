import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Job, JobContact } from '../models/job.model';

@Injectable()
export class JobService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  public removeJobContact(id: number) {
    return this.http.delete(`${environment.baseUrl}/api/job_contacts/` + id)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public updateJobContact(jobContact: any, id: number) {
    return this.http.patch(`${environment.baseUrl}/api/job_contacts/` + id, jobContact)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public getJob(id: number): Observable<any> {
    return this
    .http
    .get(`${environment.baseUrl}/api/jobs/` + id)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err.json());
    });
  }

  public getJobs(filter?: any): Observable<any> {
    if (filter === undefined) {
      filter = '';
    }

    return this.http.get(`${environment.baseUrl}/api/job${filter}`)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err);
    });
  }

  public show(id) {

    return this
    .http
    .get(`${environment.baseUrl}/api/job/` + id)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err.json());
    });
  }

  public listByType(type: string) {
    return this
    .http
    .get(`${environment.baseUrl}/api/` + type)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err.json());
    });
  }

  public jobTypes() {

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
        return Observable.throw(err);
    });
  }

  public workTypes() {

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
        return Observable.throw(err);
    });
  }

  public propertyTypes() {

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
        return Observable.throw(err);
    });
  }

  public damageTypes() {

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
        return Observable.throw(err);
    });
  }

  public referralTypes() {

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
        return Observable.throw(err);
    });
  }

  public paymentTerms() {

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
        return Observable.throw(err);
    });
  }

  public listJobs() {

    return this
    .http
    .get(`${environment.baseUrl}/api/job`)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err);
    });
  }

  public listConsolidatedJobs() {

    return this
    .http
    .get(`${environment.baseUrl}/api/data/job_list`)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err);
    });
  }

  public listRelatedJobs() {

    return this
    .http
    .get(`${environment.baseUrl}/api/data/jobs`)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err);
    });
  }

  public create(job: Job) {
    return this.http.post(`${environment.baseUrl}/api/jobs`, job)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err);
    });
  }

  public update(data: Job, jobId: number) {
    return this.http.patch(`${environment.baseUrl}/api/jobs/` + jobId, data)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err);
    });
  }

  public delete(jobId) {

    return this
    .http
    .delete(`${environment.baseUrl}/api/job/` + jobId)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err);
    });
  }

  public listJobEstimateTypes() {

    return this
    .http
    .get(`${environment.baseUrl}/api/job-estimates/types`)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err);
    });
  }

  public costTypes() {

      return this
      .http
      .get(`${environment.baseUrl}/api/job-estimates/cost/types`)
      .map((res) => res)
      .catch((err) =>  {
          return Observable.throw(err);
      });
    }

  public lineItems() {

    return this
    .http
    .get(`${environment.baseUrl}/api/job-estimates/line/items`)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err);
    });
  }

  public documentCategories() {
    return this
    .http
    .get(`${environment.baseUrl}/api/document-categories`)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err);
    });
  }

  public generateJobIdName(data) {
    return this
    .http
    .post(`${environment.baseUrl}/api/jobs/generate-id-name`, data)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err);
    });
  }

  public searchContact(term: string) {
    return this
    .http
    .get(`${environment.baseUrl}/api/contact?q=` + term)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err);
    });
  }


  public uploadDocuments(files: FileList, jobId, documentCategoryId, estimateId) {
    if (files.length > 0) {
      const formData: FormData = new FormData();
      for (let i = 0; i <= files.length; i++) {
        const file: File = files[i];
        if (file !== undefined) {
          formData.append('files[]', file);
        }
      }

      formData.append('job_id', jobId);
      formData.append('document_category_id', documentCategoryId);

      if (estimateId !== undefined && estimateId !== null) {
        formData.append('estimate_id', estimateId);
      }
      
      return this
      .http
      .post(`${environment.baseUrl}/api/job-document`, formData)
      .map((res) => res)
      .catch((err) =>  {
          return Observable.throw(err.error);
      });
    }
  }

  public deleteJobDocument(id: number) {
    return this.http.delete(`${environment.baseUrl}/api/job-document/` + id)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listJobDocuments(id: number, filter?: any) {
    if (filter === undefined) {
      filter = '';
    }
    
    return this
    .http
    .get(`${environment.baseUrl}/api/job-documents/` + id + filter)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err);
    });
  }

  public listTimeCardsByJob(id) {

    return this
    .http
    .get(`${environment.baseUrl}/api/jobs/` + id + `/time-cards`)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err);
    });
  }

  public listManagers(id) {

    return this
    .http
    .get(`${environment.baseUrl}/api/jobs/` + id + `/contacts?filter=for_change_request`)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err);
    });
  } 

  public downloadFile(id, token) {
    window.open(`${environment.baseUrl}/api/job-document/` + id + `?filter=download&token=` + token);
  }
}
