import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Employee } from './employee.model';

@Injectable()
export class TimeCardService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  /**
   * Time Record
   */

  public listCurrentTimeCard() {

    return this
    .http
    .get(`${environment.baseUrl}/api/timecards/current`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.error);
    });
  }

  public submit(data) {

    return this
    .http
    .post(`${environment.baseUrl}/api/timecards/submit`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listTimerecords() {

    return this
    .http
    .get(`${environment.baseUrl}/api/time-records?view=combined`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    }); 
  }

  public punch(data) {

    return this
    .http
    .post(`${environment.baseUrl}/api/time-records`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.error);
    }); 
  }

  public requestChange(data) {

    return this
    .http
    .post(`${environment.baseUrl}/api/timecards/current/change_request`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public getCurrentHours() {

    return this
    .http
    .get(`${environment.baseUrl}/api/timecards/current/total_hours_today`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.error);
    }); 
  }

  /**
   * End Time Record
   */
  
  public listTimeCards(weekRange) {

    return this
    .http
    .get(`${environment.baseUrl}/api/timecards` + weekRange)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    }); 
  }

  public listMyTimeCardsByStatus(data = null) {

    return this
    .http
    .post(`${environment.baseUrl}/api/time-cards/my`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public getTimeCardById(id: number) {

    return this
    .http
    .get(`${environment.baseUrl}/api/timecards/`+ id)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  } 

  public getTimeCardItemsByTimecard(id: number) {

    return this
    .http
    .get(`${environment.baseUrl}/api/timecards/`+ id + `/items`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  } 

  public getEmergencyItems(id: number) {

    return this
    .http
    .get(`${environment.baseUrl}/api/timecards/`+ id + `/items?filter=emergency`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  } 

  public weeks() {

    return this
    .http
    .get(`${environment.baseUrl}/api/weeks`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    }); 
  }

  public week() {

    return this
    .http
    .get(`${environment.baseUrl}/api/prev-week`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    }); 
  }

  public daysOfweek() {

    return this
    .http
    .get(`${environment.baseUrl}/api/days_of_current_week`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    }); 
  }

  public updateTimeCard(id, data) {

    return this
    .http
    .put(`${environment.baseUrl}/api/time-card/` + id, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    }); 
  }

  public updateTimeCardOnCall(id, data) {

    return this
    .http
    .patch(`${environment.baseUrl}/api/timecards/` + id + '?action=on_call_toggle', data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    }); 
  }

  public createTimeCardItem(id, data) {

    return this
    .http
    .post(`${environment.baseUrl}/api/timecards/` + id + `/item`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.error);
    }); 
  }

  public updateTimeCardItem(id, data) {

    return this
    .http
    .patch(`${environment.baseUrl}/api/timecard-items/` + id, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.error);
    }); 
  }

  public duplicateTimeCardItem(id, data) {

    return this
    .http
    .post(`${environment.baseUrl}/api/timecard-items/` + id + `/duplicate`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.error);
    }); 
  }

  public deleteTimeCardItem(id) {
    
    return this
    .http
    .delete(`${environment.baseUrl}/api/timecard-items/` + id)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public deleteTimeCardItemAll(id) {
    
    return this
    .http
    .delete(`${environment.baseUrl}/api/timecard-items/` + id + `?action=delete_row`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listTimerecordsSummary(id) {

    return this
    .http
    .get(`${environment.baseUrl}/api/timecards/`+ id + `/summary`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listEstimatesByTimecard(id: number) {

    return this
    .http
    .get(`${environment.baseUrl}/api/timecard_costs/`+ id + `/estimate_items`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public listItemsForAllocationByTimecard(id: number) {

    return this
    .http
    .get(`${environment.baseUrl}/api/timecards/`+ id + `/allocate_costs`)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.json());
    });
  }

  public allocateCost(data: any) {
    
    return this
    .http
    .post(`${environment.baseUrl}/api/job_costs`, data)
    .map((res) => res)
    .catch((err) =>  {
      return Observable.throw(err.error);
    });
  }
}

