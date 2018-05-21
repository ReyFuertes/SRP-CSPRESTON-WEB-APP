import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable()
export class FinancialService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  public create(id: number, data: any) {

    return this
    .http
    .post(`${environment.baseUrl}/api/jobs/` + id + `/estimates`, data)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err.error);
    });
  }

  public show(id: number) {

    return this
    .http
    .get(`${environment.baseUrl}/api/estimates/` + id + `?include=items`)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err.json());
    });
  }

  public update(id: number, data: any) {

    return this
    .http
    .patch(`${environment.baseUrl}/api/estimates/` + id, data)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err.error);
    });
  }

  public delete(id: number) {

    return this
    .http
    .delete(`${environment.baseUrl}/api/estimates/` + id)
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err.error);
    });
  }

  public approveEstimate(id) {

    return this
    .http
    .post(`${environment.baseUrl}/api/job-estimates/approve`, {id: id})
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err.json());
    });
  }

  public disapproveEstimate(id) {

    return this
    .http
    .post(`${environment.baseUrl}/api/job-estimates/disapprove`, {id: id})
    .map((res) => res)
    .catch((err) =>  {
        return Observable.throw(err.json());
    });
  }
}
