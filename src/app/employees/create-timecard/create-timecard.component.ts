import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimecardRecord } from '../../models/timecard-record.model';
import { GlobalEventsService } from '../../shared/services/global-events/global-events.service';
import { EmployeeService } from '../employee.service';
import { JobService } from '../../jobs/job.service';
import { CategoryService } from '../../categories/category.service';
import { TimeCardService } from '../timecard.service';
import { GeolocationService } from '../../shared/services/location/geolocation.service';
import { DateService } from '../../shared/services/date/date.service';
import { NumberService } from '../../shared/services/number/number.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { NotificationsService } from '../../notifications/notifications.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-create-timecard',
  templateUrl: './create-timecard.component.html',
  styleUrls: ['./create-timecard.component.scss'],
})

export class CreateTimeCardComponent implements OnInit {

  public record: TimecardRecord = new TimecardRecord();

  public timecard;

  public jobs = [];

  public activeJobs = [];

  public relatedJobs = [];

  public lineItems = [];

  public timeRecords = [];

  public reviewRecords = [];

  public absences = [];

  public daysOfWeek = [];

  public total_hours = 0;

  public current_hours = 0;

  public onCall = 0;

  public jobId = null;

  public lineItemId = null;

  public deleteItemId = null;

  public updateItemId = null;

  public lat = 0;

  public long = 0;

  public currentAddress = null;

  public time: Date = new Date();

  public date: Date = new Date();

  public requestChangeModalRef;

  public submitModalRef;

  public logModalRef;

  public deleteModalRef;

  public updateModalRef;

  public nonJob = true;

  public emergencyPay = false;

  public perDiem = false;

  public review = false;

  public super = null;

  public estimator = null;

  public isCrew = false;

  public emergencyItemExists = false;

  public unassignedExists = [];

  public address = '';

  public name = null;

  public disablePunch = false;

  public titles = ['HOLIDAY', 'EQUIPMENT', 'OFFICE', 'SICK', 'VACATION', 'EMERGENCY'];

  public createTimeRecordForm: FormGroup;

  public requestChangeForm: FormGroup;

  public logModalForm: FormGroup;

  public updateModalForm: FormGroup;

  @ViewChild('requestModal')
  public requestModal;

  @ViewChild('submitConfirmationModal')
  public submitConfirmationModal;

  @ViewChild('logModal')
  public logModal;

  @ViewChild('deleteModal')
  public deleteModal;

  @ViewChild('onCallModal')
  public onCallModal;

  @ViewChild('updateModal')
  public updateModal;

  constructor(
    private events: GlobalEventsService,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private jobService: JobService,
    private tS: TimeCardService,
    private locationService: GeolocationService,
    private modalService: NgbModal,
    private dateService: DateService,
    private authService: AuthenticationService,
    private numService: NumberService,
    private categoryService: CategoryService,
    private notificationService: NotificationsService) {
  }

  ngOnInit() {
    this.loadLocation();
    this.listConsolidatedJobs();
    this.loadLineItems();
    this.loadDaysofWeek();
    this.initCreateTimeRecord();
    this.initRequest();
    this.initLog();
    this.initUpdateForm();
    this.getName();

    setInterval(() => {
        this.time = new Date();
    }, 100)
      
    this.events.events$.filter(event => event.name === 'timerecords:get').subscribe(event => {
      this.loadTimeRecords();  
    });

    this.events.events$.filter(event => event.name === 'timecard:get').subscribe(event => {
      this.loadCurrentTimeCard();
    });

    this.events.events$.filter(event => event.name === 'timecard:get_hours_today').subscribe(event => {
      this.loadCurrentHours();   
    });

    this.events.emit('timerecords:get', {});
    this.events.emit('timecard:get', {});
    this.events.emit('timecard:get_hours_today', {});
    this.isCrew = this.authService.isCrew();
  }

  protected loadLocation() {
    this
    .locationService
    .getLocation({ enableHighAccuracy: true, timeout: 30000, maximumAge: 0 })
    .subscribe((position) => {      
      let coords = position.coords;
      this.lat = coords.latitude;
      this.long = coords.longitude;
      this
      .locationService
      .reverseGeocode(this.lat, this.long)
      .subscribe((address) => {
        this.currentAddress = address;
        this.address = this.currentAddress.complete_address;
      },
      (error) => {
        this.lat = 0;
        this.long = 0;
        this.currentAddress = '';
      });
    },
    (error) => {
      this.lat = 0;
      this.long = 0;
      this.currentAddress = '';
    })
  }

  protected listConsolidatedJobs() {
    this
    .jobService
    .listConsolidatedJobs()
    .subscribe(
      (res) => {
        let jobs = res.data;

        jobs.forEach((item, index) => {
          this.jobs.push({ id: item.id, text: item.value });

          if (typeof item.id == 'number') {
            this.activeJobs.push({ id: item.id, text: item.value });
            this.relatedJobs.push({ id: item.id, text: item.value });
          }
        });
      },
      (err) => {
        console.log(err);
      }
      );
  }

  protected loadLineItems() {
    this
    .categoryService
    .listLineItemsData()
    .subscribe(
      (res) => {
        let lineItems = res.data;

        lineItems.forEach(item => {
          this.lineItems.push({ id: item.id, text: item.value });
        });

        this.nonJob = false;
      },
      (err) => {
        console.log(err);
      }
      );
  }

  protected loadDaysofWeek() {
    this
      .tS
      .daysOfweek()
      .subscribe(
      (res) => {
        for (let i in res.data) {
          this.daysOfWeek.push({ id: i, value: res.data[i] });
        }

        this.logModalForm.get('date_of_labor').setValue(this.daysOfWeek[0].id)
      },
      (err) => {
        console.log(err);
      }
      );
  }

  protected initCreateTimeRecord() {
    this.createTimeRecordForm = this.fb.group(
    {
      job_id: [ 0, Validators.compose([ Validators.required ]) ],
      line_item_id: 0,
      type: 'IN',
      is_emergency_pay: false,
      is_per_diem: false
    });
  }

  protected initRequest() {
    this.requestChangeForm = this.fb.group(
      {
        job_id: [ '', Validators.compose([ Validators.required, Validators.maxLength(255) ]) ],
        line_item_id: [ '', Validators.compose([ Validators.required, Validators.maxLength(255) ]) ],
        body: [ '', Validators.compose([ Validators.required ]) ],
      });
  }

  protected initLog() {
    this.logModalForm = this.fb.group(
      {
        date_of_labor: [],
        hours: [8],
        job_id: [ 'SICK' ]
      });
  }

  protected initUpdateForm() {
    this.updateModalForm = this.fb.group(
      {
        job_id: []
      });
  }

  protected loadTimeRecords() {
    this
     .tS
     .listTimerecords()
     .subscribe((res) => {
        this.timeRecords = res.data;
      },
      (err) => {
        console.log(err);
      });
  }

  protected loadReviewRecords() {
    this
     .tS
     .listTimerecordsSummary(this.timecard.id)
     .subscribe((res) => {
        this.reviewRecords = res.data;
        this.emergencyItemExists = false;

        if (res.data.items.length) {
          res.data.items.forEach((item) => {
            if (item.is_emergency_pay == true) {
              this.emergencyItemExists = true;
            }
          });

          this.unassignedExists = res.data.items.filter((item) => {
            return item.job_name == 'Unassigned Time'
          });
        }
      },
      (err) => {
        console.log(err);
      });
  }

  protected loadCurrentTimeCard() {
    this
    .tS
    .listCurrentTimeCard()
    .subscribe((res) => {
      if (res) {
        this.timecard = res.data;
        if(this.isSubmitted()) {
          this.onReview();
        }
      }
    },
    (err) => {
      console.log(err);
    })
  }

  protected loadCurrentHours() {
    this
    .tS
    .getCurrentHours()
    .subscribe((res) => {
      this.current_hours = res.total_hours_today;
    },
    (err) => {
      console.log(err);
    })
  }

  protected isPunchFormValid(data: any) {
    
    if (data.job_id == null) {
      this.notificationService.error('Job is required.');

      return false;
    }

    if (data.job_id != null && (this.titles.indexOf(data.job_id) < 0) && data.line_item_id == null) {
      this.notificationService.error('Line item is required.');

      return false;
    }

    return true;
  }

  protected getName() {
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;;
    this.name = (localStorage.getItem('name') && localStorage.getItem('name').length) > 0 ? JSON.parse(localStorage.getItem('name')) : user.email;
  }

  public onChangeJob(value) {
    this.jobId = value;

    if (this.titles.indexOf(value) > -1) {
      this.nonJob = true;
    } else {
      this.nonJob = false;
    }
  }

  public onChangeLineItem(event) {
    this.lineItemId = event.id;
  }

  public punchIn() {

    if (this.isPunchFormValid(this.setRecord('IN'))) {
      this.disablePunch = true;

      this
       .tS
       .punch(this.setRecord('IN'))
       .subscribe((res) => {
          this.disablePunch = false;
          this.events.emit('timerecords:get', {});
          this.events.emit('timecard:get', {});
          this.events.emit('timecard:get_hours_today', {});
        },
        (err) => {
          this.disablePunch = false;

          if (err.message) {
            this.notificationService.error(err.message);
          }

          if (err.errors) {
            for (let i in err.errors) {
              this.notificationService.error(err.errors[i]);
            }
          }
        });
    }
  }

  public punchOut() {
    this.disablePunch = true;

    this
     .tS
     .punch(this.setRecord('OUT'))
     .subscribe((res) => {
        this.disablePunch = false;
        this.events.emit('timerecords:get', {});
        this.events.emit('timecard:get', {});
        this.events.emit('timecard:get_hours_today', {});
      },
      (err) => {
        this.disablePunch = false;

        if (err.message) {
          this.notificationService.error(err.message);
        }

        if (err.errors) {
          for (let i in err.errors) {
            this.notificationService.error(err.errors[i]);
          }
        }
      });
  }

  public setRecord(type: string) {
    this.record.job_id = (this.titles.indexOf(this.jobId) > -1) || this.jobId == 'UNASSIGNED' ? this.jobId : (this.jobId == null ? null : parseInt(this.jobId));
    this.record.line_item_id = parseInt(this.lineItemId);
    this.record.type = type;
    this.record.lng = this.long;
    this.record.lat = this.lat;
    this.record.location = this.address;

    if (this.lineItemId == null) {
      delete this.record.line_item_id;
    }

    if (this.emergencyPay) {
      this.record.is_emergency_pay = true;
    }

    if (this.perDiem) {
      this.record.is_per_diem = true;
    }

    if (this.nonJob) {
      delete this.record.line_item_id;
    }

    return this.record;
  }

  public onSubmit() {
    if (this.unassignedExists.length > 0) {
       this.notificationService.error('There are unassigned time records');
    }  else {
      this.submitModalRef = this.modalService.open(this.submitConfirmationModal);
    }
  }

  public onRequestChange() {
    this.requestChangeModalRef = this.modalService.open(this.requestModal);

    this.requestChangeModalRef.result.then((data) => {}, (reason) => {
        this.initRequest();
    });
  }

  public requestChange() {
    const data = {
      body: this.requestChangeForm.value.body,
      job_id: parseInt(this.requestChangeForm.value.job_id),
      line_item_id: parseInt(this.requestChangeForm.value.line_item_id),
    }

    this
    .tS
    .requestChange(data)
    .subscribe((res) => {
      this.requestChangeModalRef.close();
      this.notificationService.success('Request change sent');
    }, 
    (err) => {
      console.log(err)
    })
  }

  public onUpdate(id) {
    this.updateItemId = id;
    this.updateModalRef = this.modalService.open(this.updateModal);
  }
  
  public submit() {
    let data = {
      on_call_this_week: this.onCall
    }

    this
     .tS
     .submit(data)
     .subscribe((res) => {
        this.events.emit('timecard:get', {});
        this.review = false;
        this.submitModalRef.close();
        this.notificationService.success('Time records submitted');
      },
      (err) => {
        console.log(err);
      });
  }

  /**
   * Check if not submitted
   *
   * @return boolean
   */
  public isNotSubmitted() {
    return (!this.timecard || this.timecard.status == 'Not Submitted');
  }

  /**
   * Check if submitted
   *
   * @return boolean
   */
  public isSubmitted() {
      return !this.isNotSubmitted();
  }

  public onReview() {
    this.review = true; 
    this.loadReviewRecords();
  }

  public onReturn() {
    this.events.emit('timerecords:get', {});
    this.events.emit('timecard:get', {});
    this.events.emit('timecard:get_hours_today', {});
    this.emergencyPay = false;
    this.perDiem = false;
    this.review = false;
  }

  public onJobChange(event) {
    this
    .requestChangeForm
    .get('job_id')
    .setValue(event.id);

    this
     .jobService
     .listManagers(event.id)
     .subscribe((res) => {
        if (res.data.super) {
          this.super = res.data.super;
        }

        if (res.data.estimator) {
          this.estimator = res.data.estimator;
        }
      },
      (err) => {
        console.log(err);
      });
  } 

  public onLineItemChange(event) {
    this
    .requestChangeForm
    .get('line_item_id')
    .setValue(event.id);
  }

  public onBodyChange(event) {
    this
    .requestChangeForm
    .get('body')
    .setValue(event.target.value)
  }

  public onLogAbsences() {
    this.logModalRef = this.modalService.open(this.logModal);

    this.logModalRef.result.then((data) => {}, (reason) => {
        this.initLog();
    });
  }

  public logAbsences(form) {
    form['date_of_labor'] = this.dateService.formatDate(form.date_of_labor);

    this
      .tS
      .createTimeCardItem(this.timecard.id, form)
      .subscribe(
      (res) => {
        this.loadReviewRecords();
        this.logModalRef.close();
        this.notificationService.success('Create successful');
      },
      (err) => {
        if (err.message) {
          this.notificationService.error(err.message);
        }
      }
      );
  } 

  public updateOnCall(event) {
    this.onCall = event.target.checked ? 1 : 0;

    if (this.emergencyItemExists && this.onCall && this.isNotSubmitted()) {
      this.modalService.open(this.onCallModal);
    }
  }

  public onDeleteItem(id) {
    this.deleteItemId = id;
    this.deleteModalRef = this.modalService.open(this.deleteModal);
  }

  public deleteItem() {
    this
      .tS
      .deleteTimeCardItem(this.deleteItemId)
      .subscribe(
      (res) => {
        this.loadReviewRecords();
        this.deleteModalRef.close();
      },
      (err) => {
        console.log(err);
      }
      );
  }

  public onSetEmergency(event) {
    this.emergencyPay = event.target.checked;
  }

  public onSetPerDiem(event) {
    this.perDiem = event.target.checked;
  } 

  /**
   * Format number
   *
   * @return number
   */
  public formatNumber(n) {
    return this.numService.checkNumber(n);
  }

  public onCloseReport() {
    this.initRequest();
    this.requestChangeModalRef.close();
  }

  /**
   * Check if string
   *
   * @return boolean
   */
  public isString(address) {
    return address != null && typeof address == 'string';
  }

  /**
   * Check if object
   *
   * @return boolean
   */
  public isObject(address) {
    return address != null && typeof address == 'object';  
  }

  public onChangeJobUpdate(id) {
    this.updateModalForm.controls['job_id'].setValue(id);
  }

  public updateRecord() {
    let data = { action: 'update_job', job_id: parseInt(this.updateModalForm.controls['job_id'].value) };

    this
      .tS
      .updateTimeCardItem(this.updateItemId, data)
      .subscribe(
      (res) => {
        this.loadReviewRecords();
        this.events.emit('timecard:get', {});
        this.events.emit('timecard:get_hours_today', {});
        this.updateModalRef.close();
        this.notificationService.success('Update successful');
      },
      (err) => {
        if (err.message) {
          this.notificationService.error(err.message);
        }
      }
      );
  }
}
