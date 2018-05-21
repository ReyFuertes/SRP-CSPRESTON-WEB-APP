import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Employee } from './employee.model';

@Injectable()
export class InvoiceService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  public createJobContactInvoice(data) {

    return this
    .http
    .post(`${environment.baseUrl}/api/job-contact-invoice`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listMyJobContactInvoiceByStatus() {

    return this
    .http
    .get(`${environment.baseUrl}/api/job-contact-invoices/my`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public generateInvoiceId() {
    
    return this
    .http
    .get(`${environment.baseUrl}/api/job-contact-invoices/id`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public createEstimateInvoice(id: number, data: any) {

    return this
    .http
    .post(`${environment.baseUrl}/api/estimates/` + id + `/invoices`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listEstimateInvoiceByJob(jobId) {

    return this
    .http
    .get(`${environment.baseUrl}/api/jobs/` + jobId + '/invoices')
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listInvoiceAndPaymentsByJob(jobId) {

    return this
    .http
    .get(`${environment.baseUrl}/api/jobs/` + jobId + '/invoice_and_payments')
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public createPayment(id: number, data: any) {

    return this
    .http
    .post(`${environment.baseUrl}/api/jobs/` + id + `/payments`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public issueInvoice(id: number) {

    return this
    .http
    .patch(`${environment.baseUrl}/api/estimate-invoices/` + id + `?action=issue_invoice`, {})
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }
}

