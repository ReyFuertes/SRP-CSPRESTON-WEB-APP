import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeTimecard } from './../../models/employee-timecard-item.model';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { JobService } from '../../jobs/job.service';
import { CategoryService } from '../../categories/category.service';
import { EmployeeService } from '../employee.service';
import { TimeCardService } from '../timecard.service';
import { NotificationsService } from '../../notifications/notifications.service';
import { AuthenticationService } from '../../authentication/authentication.service';
import { TabProviderService } from '../../shared/services/tab-provider/tab-provider.service';
import { GlobalEventsService } from '../../shared/services/global-events/global-events.service';
import { DateService } from '../../shared/services/date/date.service';
import { NumberService } from '../../shared/services/number/number.service';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-employee-timecard-items',
  templateUrl: './employee-timecard-items.component.html',
  styleUrls: ['./employee-timecard-items.component.scss']
})

export class EmployeeTimeCardItemsComponent implements OnInit {

  private subscription: Subscription;

  public timecard: EmployeeTimecard;

  public id: any;

	public timeCardItems = [];

  public items = [];

  public jobs = [];

  public filterJobs = [];

  public lineItems = [];

  public rateTypes = [];

  public lineItemsFilter = [];

  public rateTypesFilter = [];

  public estimates = [];

  public timeCardCosts = [];

  public weeks = [];

  public item = null;

  public status = '';

  public rateTypeId = null;

  public deleteItemId = null;

  public changeStatusModalRef = null; 

  public saveModalRef = null;

  public newItemModalRef = null;

  public splitModalRef = null;

  public deleteModalRef = null;

  public onCallModalRef = null;

  public allocateModalRef = null; 

  public save = false;

  public isEmergency = false;

  public isPerDiem = false;

  public updatingTable = false;

  public emergencyItemExists = false;

  public titles = ['HOLIDAY', 'EQUIPMENT', 'OFFICE', 'SICK', 'VACATION', 'EMERGENCY CALLS', 'PER DIEM', 'E & P', 'DAILY TOTAL'];

  public dates = null;

  public isEmergencyPay = false;

  public onCall = false;

  public currentStep = 1;

  public tabItems: MenuItem[];

  public activeTabItem: MenuItem;

  public allocateJobName = null;

  public allocateLineItemName = null;

  public unAllocated = 0;

  /**
   * Temporary timecard used when doing filters
   * var array
   */
  protected temp: FormArray;

  /**
   * Temporary timecard used when doing filters
   * var array
   */
  protected values = [];

  public jobFilter = null;

  public lineItemFilter = null;

  public rateTypeFilter = null;

  @ViewChild('changeStatusModal')
  public changeStatusModal;

  @ViewChild('saveModal')
  public saveModal; 

  @ViewChild('newItemModal')
  public newItemModal; 

  @ViewChild('splitModal')
  public splitModal; 

  @ViewChild('deleteModal')
  public deleteModal; 

  @ViewChild('onCallModal')
  public onCallModal; 

  @ViewChild('allocateModal')
  public allocateModal; 

  public timecardItemForm: FormGroup;

  public newItemModalForm: FormGroup;

  public onCallModalForm: FormGroup;

  public changeStatusModalForm: FormGroup;

  public allocateModalForm: FormGroup;

  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: ''
    },
    {
      text: "Timecards",
      path: '/timecards'
    },
    {
      text: "Timecard Items",
      path: ''
    }
  ];

  constructor(private jobService: JobService,
              private employeeService: EmployeeService,
  						private timeCardService: TimeCardService,
  					  private fb: FormBuilder,
              private mS: NgbModal,
              public authService: AuthenticationService,
              private events: GlobalEventsService,
              private dateService: DateService,
              private numService: NumberService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private notificationService: NotificationsService,
              private categoryService: CategoryService) {
   	
  }

  ngOnInit() {
    this.listConsolidatedJobs();
    this.loadLineItems();
    this.loadRateTypes();
    this.loadWeeks();
    this.initNewItem();
    this.initChangeStatus();

    this.tabItems = [
      {
        label: 'Timecard', icon: 'fa-clock-o', command: () => {
          this.currentStep = 1;
        }
      },
      {
        label: 'Allocation', icon: 'fa-money', command: () => {
          this.currentStep = 2;
        }
      }
    ];

    this.activeTabItem = this.tabItems[0];

    this.subscription = this.activateRoute.params.subscribe(params => {
      this.loadForAllocation(+params['id']);
      this.loadTimeCard(+params['id']); 
      this.setOwnId(+params['id']);
    });
  }

  public setOwnId (id): void {
    this.id = id;
  }

  protected listConsolidatedJobs() {
    this
    .jobService
    .listConsolidatedJobs()
    .subscribe(
      (res) => {
        let jobs = res.data;
        this.filterJobs.push({ id: 0, text: 'All Jobs' });

         jobs.forEach((item, index) => { 
         if (typeof item.id == 'number') {
            this.jobs.push({ id: item.id, text: item.value });
            this.filterJobs.push({ id: item.id, text: item.value });
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
      .listLineItems()
      .subscribe(
      (res) => {
        let lineItems = res.data;
        this.lineItemsFilter.push({ id: 0, text: 'All Line Items' });

        for (let i in lineItems) {
          this.lineItems.push({ id: i, text: lineItems[i] });
          this.lineItemsFilter.push({ id: i, text: lineItems[i] });
        }
      },
      (err) => {
        console.log(err);
      }
      );
  }

  protected loadRateTypes() {
    this.employeeService
      .getRateTypes()
      .subscribe(
      (res) => {
        this.rateTypes = res.data;
        this.rateTypesFilter.push({ id: 0, text: 'All Rate Types' });

        this.rateTypes.forEach((type) => {
          if (type.name == 'Overtime') {
            this.rateTypeId = type.id;
          }

          this.rateTypesFilter.push({ id: type.id, text: type.name });
        })
      },
      (err) => {
        console.log(err);
      }
      );
  }

  protected loadTimeCard(timecardId: number): void {
    
    if (!this.updatingTable) {
      this.createTimeCardItemForm();
    }

    if (timecardId != 0) {

     this.getTimecard(timecardId);
     this.getTimecardItems(timecardId);
  
    } else {
      for (let i = 0; i <= 6; i++) {
        this.onAddingNewLineItem();
      }
    }
  }

  protected initItemRows(item = null) {
    if (this.titles.indexOf(item.job_name) > -1) {
      return this.fb.group({
        id: [item.id],
        job: [item.job_name],
        line_item: [''],
        rate_type: [''],
        hours: [''],
        sat: [item.all_hours[0] > 0 ? this.formatNumber(item.all_hours[0].toFixed(2)) : this.formatNumber(item.all_hours[0])],
        sun: [item.all_hours[1] > 0 ? this.formatNumber(item.all_hours[1].toFixed(2)) : this.formatNumber(item.all_hours[1])],
        mon: [item.all_hours[2] > 0 ? this.formatNumber(item.all_hours[2].toFixed(2)) : this.formatNumber(item.all_hours[2])],
        tue: [item.all_hours[3] > 0 ? this.formatNumber(item.all_hours[3].toFixed(2)) : this.formatNumber(item.all_hours[3])],
        wed: [item.all_hours[4] > 0 ? this.formatNumber(item.all_hours[4].toFixed(2)) : this.formatNumber(item.all_hours[4])],
        thu: [item.all_hours[5] > 0 ? this.formatNumber(item.all_hours[5].toFixed(2)) : this.formatNumber(item.all_hours[5])],
        fri: [item.all_hours[6] > 0 ? this.formatNumber(item.all_hours[6].toFixed(2)) : this.formatNumber(item.all_hours[6])],
        total_hours: [item.total_row_hours > 0 ? this.formatNumber(item.total_row_hours.toFixed(2)) : this.formatNumber(item.total_row_hours)],
        is_emergency_pay: [item.is_emergency_pay ? 1 : 0],
        is_per_diem: [item.is_per_diem ? 1 : 0],
        total_cost: [item.total_row_cost ? item.total_row_cost : 0],
        date_of_labor: ['']
      });
    }
    else {
      return this.fb.group({
        id: [item.id],
        itemObject: [item],
        job: [item.job_name],
        line_item: [item.line_item_name],
        rate_type: [item.rate_type_name],
        hours: [item.hours],
        sat: [item.all_hours[0] > 0 ? this.formatNumber(item.all_hours[0].toFixed(2)) : this.formatNumber(item.all_hours[0])],
        sun: [item.all_hours[1] > 0 ? this.formatNumber(item.all_hours[1].toFixed(2)) : this.formatNumber(item.all_hours[1])],
        mon: [item.all_hours[2] > 0 ? this.formatNumber(item.all_hours[2].toFixed(2)) : this.formatNumber(item.all_hours[2])],
        tue: [item.all_hours[3] > 0 ? this.formatNumber(item.all_hours[3].toFixed(2)) : this.formatNumber(item.all_hours[3])],
        wed: [item.all_hours[4] > 0 ? this.formatNumber(item.all_hours[4].toFixed(2)) : this.formatNumber(item.all_hours[4])],
        thu: [item.all_hours[5] > 0 ? this.formatNumber(item.all_hours[5].toFixed(2)) : this.formatNumber(item.all_hours[5])],
        fri: [item.all_hours[6] > 0 ? this.formatNumber(item.all_hours[6].toFixed(2)) : this.formatNumber(item.all_hours[6])],
        total_hours: [item.total_row_hours > 0 ? this.formatNumber(item.total_row_hours.toFixed(2)) : this.formatNumber(item.total_row_hours)],
        date_of_labor: new Date(item.date_of_labor),
        is_emergency_pay: [item.is_emergency_pay ? 1 : 0],
        is_per_diem: [item.is_per_diem ? 1 : 0],
        total_cost: [item.total_row_cost ? item.total_row_cost : 0 ],
        status: ['approved']
      });
    }
  }

  protected initNewItem() {
    this.newItemModalForm = this.fb.group({
        job: [0, Validators.compose([ Validators.required ])],
        line_item: [0, Validators.compose([ Validators.required ])],
        rate_type: [1],
        is_emergency_pay: [0],
        is_per_diem: [0],
        sat: [0],
        sun: [0],
        mon: [0],
        tue: [0],
        wed: [0],
        thu: [0],
        fri: [0]
    });
  }

  protected initChangeStatus() {
    this.changeStatusModalForm = this.fb.group({
        status: [ this.isSuperOrEstimator() ? 'Pending AP' : 'Pending Payment', Validators.compose([ Validators.required, Validators.maxLength(255) ]) ]
    });
  }

  protected onAddingNewLineItem(item = null) {
    const control = <FormArray>this.timecardItemForm.controls['itemRows'] as FormArray;
    control.push(this.initItemRows(item));
  }

  protected onRemovingLineItem(index) {
    const control = <FormArray>this.timecardItemForm.controls['itemRows'] as FormArray;
    control.removeAt(index);
  }

  protected createTimeCardItemForm() {
    this.timecardItemForm = this.fb.group({
      time_card_id: [1, Validators.required],
      status: [''],
      itemRows: this.fb.array([])
    });
  }

  protected loadForAllocation(id: number) {
    this
    .timeCardService
    .listItemsForAllocationByTimecard(id)
    .subscribe(
    (res) => {
      this.timeCardCosts = res.data;
    }, 
    (err) => {
      console.log(err);
    })
  }

  get getItems() { return <FormArray>this.timecardItemForm.get('itemRows'); }

  get getItemHours() { return <FormArray>this.newItemModalForm.get('hours'); }

  public getTimecard(id: number) {
     this
      .timeCardService
      .getTimeCardById(id)
      .subscribe(
        (res) => {
          
          this.timecard = res.data;
          this.onCall = this.timecard.on_call_this_week;

          this.timecardItemForm.controls['time_card_id'].setValue(this.timecard.id, {emitEvent: false});
          this.timecardItemForm.controls['status'].setValue(this.timecard.status, {emitEvent: false});
        },
        (error) => {
          console.log(error);
        }
      );
  }

  public getTimecardItems(id: number) {
    this
      .timeCardService
      .getTimeCardItemsByTimecard(id)
      .subscribe(
        (res) => {
          let issetEmergencyPay = false;
          let issetPerDiem = false;
          let issetEP = false;
          this.timecardItemForm.controls['itemRows'] = this.fb.array([]);
          
          this.items = res.data;
         
          this.items.forEach((item) => {

            if (!item.is_per_diem && item.is_emergency_pay && !issetEmergencyPay) {
              this.emergencyItemExists = true;
              issetEmergencyPay = true;
              this.onAddingNewLineItem({ job_name: 'EMERGENCY CALLS', all_hours: [0, 0, 0, 0, 0, 0, 0], total_row_hours: 0  });
            } else if (!item.is_emergency_pay && item.is_per_diem && !issetPerDiem) {
              issetPerDiem = true;
              this.onAddingNewLineItem({ job_name: 'PER DIEM', all_hours: [0, 0, 0, 0, 0, 0, 0], total_row_hours: 0  });
            } else {
              if (item.is_emergency_pay && item.is_per_diem && !issetEP) {
                issetEP = true;
                this.onAddingNewLineItem({ job_name: 'E & P', all_hours: [0, 0, 0, 0, 0, 0, 0], total_row_hours: 0  });
              }
            }

            this.onAddingNewLineItem(item);
          });

          this.onAddingNewLineItem({ job_name: 'DAILY TOTAL', all_hours: [0, 0, 0, 0, 0, 0, 0], total_row_hours: 0  })
          this.sumUpDailyTotal();
          this.onRowChanges();

          if (this.updatingTable) {
            this.updatingTable = false;
          }

          this.temp = this.getItems;
        },
        (error) => {
          console.log(error);
        })
  }

  public onDateChange(event) {
    this
    .newItemModalForm
    .get('date_of_labor')
    .setValue(event.target.value, {emitEvent: false})
  }

  public onJobChange(event) {
    this
    .newItemModalForm
    .get('job')
    .setValue(event.id, {emitEvent: false})
  }

  public onLineItemChange(event){
    this
    .newItemModalForm
    .get('line_item')
    .setValue(event.id, {emitEvent: false});
  }

  public onRateTypeChange(event){
    this
    .newItemModalForm
    .get('rate_type')
    .setValue(event.target.value, {emitEvent: false})
  }

  public changeNewItemEmergency(event) {
    this
    .newItemModalForm
    .get('is_emergency_pay')
    .setValue(event.target.checked ? 1 : 0, {emitEvent: false})

    this.isEmergency = event.target.checked;
  }

  public changeNewItemPerDiem(event) {
     this
    .newItemModalForm
    .get('is_per_diem')
    .setValue(event.target.checked ? 1 : 0, {emitEvent: false})

    this.isPerDiem = event.target.checked;
  }

  public onChangeStatus() {
    this.changeStatusModalRef = this.mS.open(this.changeStatusModal);

     this.changeStatusModalRef.result.then((data) => {}, (reason) => {
      this.initChangeStatus();
    });
  }

  public updateTimecard() {
    let data = {
      status: this.timecardItemForm.controls['status'].value
    }

    this
    .timeCardService
    .updateTimeCard(this.timecard.id, data)
    .subscribe(
      (res) => {
        this.timecard = res.data;
        this.notificationService.success('Update successful');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public onUpdateOnCall(event) {
    this.onCall = event.target.checked;

    if (this.onCall) {

      if (this.emergencyItemExists) {
        this.onCallModalRef = this.mS.open(this.onCallModal);

        this.onCallModalRef.result.then((data) => {}, (reason) => {
            this.onCall = false;
        });
      } else {
        this.onCall = true;
        this.updateOnCall();
      }
    } else {
      this.onCall = false;
      this.updateOnCall();
    }
  }

  public updateOnCall() {
    let data = {
      on_call_this_week: this.onCall ? 1 : 0
    }

    this
    .timeCardService
    .updateTimeCardOnCall(this.timecard.id, data)
    .subscribe(
      (res) => {
        this.timecard = res.data;
        this.updatingTable = true;
        this.onCallModalRef.close();
        this.notificationService.success('Update successful');

        this.loadTimeCard(this.timecard.id);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public changeStatusTimecard(form) {
    this.changeStatusModalRef.close();
    this.timecardItemForm.controls['status'].setValue(form.value.status);
    this.updateTimecard();
  }

  public isNotApprovedByCurrentUser() {
    return this.superApproval()
            ? true
            : (this.apApproval()
               ? true
               : false)
  }

  public superApproval() {
    return (
        (this.authService.isSuper() && this.timecard.status == 'Pending Super')
        || (this.authService.isEstimator() && this.timecard.status == 'Pending Super')
    );
  }

  public apApproval() {
    return this.authService.isAPManager() && 
            (this.timecard.status == 'Pending AP' || 
             this.timecard.status == 'Pending Payment' || 
             this.timecard.status == 'Partially Paid')
  }

  /**
   * Check if fully paid
   *
   * @return boolean
   */
  public fullyPaid() {
    return this.timecard.status == 'Fully Paid';
  }

  /**
   * Check if Pending
   *
   * @return boolean
   */
  public isPending() {
    return (this.timecard.status == 'Pending Super' ||  this.timecard.status == 'Pending AP');
  }

  public submitLabel() {
    let label = 'Submit to';

    if (this.superApproval()) {
      label = label + ' AP';
    }

    if (this.apApproval()) {
      label = label + ' Pending Payment';
    }

    return label;
  }

  public setDateRange(weekRange) {
    this.dates = this.dateService.parseDates(weekRange);
  }

  public loadWeeks() {
    this.timeCardService
      .weeks()
      .subscribe(
      (res) => {
        for (var week in res.data) {
          this.weeks.push({ id: week, name: res.data[week] });
        }

        this.setDateRange(res.data[1]);
      },
      (err) => {
        console.log(err);
      }
      );
  }

  public addNewItem() {
    this.isEmergency = false;
    this.isPerDiem = false;
    this.newItemModalRef = this.mS.open(this.newItemModal); 

    this.newItemModalRef.result.then((data) => {}, (reason) => {
      this.initNewItem();
      this.isEmergency = false;
      this.isPerDiem = false;
      this.id = 'employee-timecard-6';
    });
  }

  protected newItemData() {
    return {
      job_id: parseInt(this.newItemModalForm.value.job),
      line_item_id: parseInt(this.newItemModalForm.value.line_item),
      rate_type_id: parseInt(this.newItemModalForm.value.rate_type),
      all_hours: [ 
        this.newItemModalForm.value.sat,
        this.newItemModalForm.value.sun,
        this.newItemModalForm.value.mon,
        this.newItemModalForm.value.tue,
        this.newItemModalForm.value.wed,
        this.newItemModalForm.value.thu,
        this.newItemModalForm.value.fri
      ],
      is_emergency_pay: this.newItemModalForm.value.is_emergency_pay,
      is_per_diem: this.newItemModalForm.value.is_per_diem
    }
  }

  protected isNewItemValid(data: any) {
    if (!data.job_id) {
      this.notificationService.error('Job is required.');

      return false;
    }

    if (!data.line_item_id) {
      this.notificationService.error('Line Item is required.');
      
      return false;
    }

    return true;
  }

  public createNewItem() {
    if (this.isNewItemValid(this.newItemData())) {
      this.updatingTable = true;

      this.timeCardService
        .createTimeCardItem(this.timecard.id, this.newItemData())
        .subscribe(
        (res) => {
          this.loadTimeCard(this.timecard.id);
          this.initNewItem();
          this.id = 'employee-timecard-6';
          this.newItemModalRef.close();

          this.notificationService.success('Item created.');
        },
        (err) => {
          if (err.message) {
            this.notificationService.error(err.message);
          }

          this.updatingTable = false;
        }
        );
    }
  }

  public onSplitItem(item) {
    this.item = item;
    this.isEmergencyPay = false;
    this.splitModalRef = this.mS.open(this.splitModal);

    this.splitModalRef.result.then((data) => {}, (reason) => {
      this.loadRateTypes();
    });
  }

  public onSplitRateTypeChange($event) {
    this.rateTypeId = $event.target.value;
  }

  public splitItem() {
    const data = {
      rate_type_id: parseInt(this.rateTypeId),
      all_hours: [0, 0, 0, 0, 0, 0, 0],
      is_emergency_pay: this.isEmergencyPay ? 1 : 0
    }

    this.updatingTable = true;

    this.timeCardService
      .duplicateTimeCardItem(this.item.id, data)
      .subscribe(
      (res) => {
        this.loadTimeCard(this.timecard.id);
        this.splitModalRef.close();

        this.notificationService.success('Item duplicated.');
      },
      (err) => {
        if (err.message) {
          this.notificationService.error(err.message);
        }

        this.updatingTable = false;
      }
      );
  }

  public onDeleteItem(item) {
    this.deleteItemId = item.id;
    this.deleteModalRef = this.mS.open(this.deleteModal);
  }

  public deleteItem() {
    this.updatingTable = true;
    this.timeCardService
      .deleteTimeCardItemAll(this.deleteItemId)
      .subscribe(
      (res) => {
        this.loadTimeCard(this.timecard.id);
        this.deleteModalRef.close();

        this.notificationService.success('Item deleted.');
      },
      (err) => {
        this.updatingTable = false;
        console.log(err);
      }
      );
  }

  public onRowChanges() {
    this.getItems.controls.forEach((control) => {
      control
      .valueChanges
      .debounceTime(500)
      .subscribe((val) => {
        let totalHours = parseFloat(val.sat) + parseFloat(val.sun) + parseFloat(val.mon) +
          parseFloat(val.tue) + parseFloat(val.wed) + parseFloat(val.thu) + parseFloat(val.fri), 
          data =  {
            action: 'update_items',
            all_hours: [
            parseFloat(val.sat), 
            parseFloat(val.sun), 
            parseFloat(val.mon), 
            parseFloat(val.tue), 
            parseFloat(val.wed), 
            parseFloat(val.thu), 
            parseFloat(val.fri)]
          },
          id = (val.id != null) ? val.id : this.timecard.id;

        this.updatingTable = true;

        if (val.id == null && this.titles.indexOf(val.job) > -1) {
          delete data.action;
          data['job_id'] = val.job;

          this
          .timeCardService
          .createTimeCardItem(id, data)
          .subscribe((res) => {
            control
            .get('total_hours')
            .setValue(this.formatNumber(totalHours.toFixed(2)), {emitEvent: false});

            this.sumUpDailyTotal();
            this.loadTimeCard(this.timecard.id);

            this.notificationService.success('Item updated.');
          }, 
          (err) => {
            console.log(err);
          });

        } else {
          if (!val.itemObject) {
            data['log_type'] = val.job;
          }

          this
          .timeCardService
          .updateTimeCardItem(id, data)
          .subscribe((res) => {
            control
            .get('total_hours')
            .setValue(this.formatNumber(totalHours.toFixed(2)), {emitEvent: false});

            this.sumUpDailyTotal();
            this.loadTimeCard(this.timecard.id);

            this.notificationService.success('Item updated.');
          }, 
          (err) => {
            if (err.message) {
              this.notificationService.error(err.message);
            }

            this.loadTimeCard(this.timecard.id);
          });
        }
      })
    })
  }

  public sumUpDailyTotal() {
    let sat = 0,
        sun = 0,
        mon = 0,
        tue = 0,
        wed = 0,
        thu = 0, 
        fri = 0,
        totalCost = 0,
        length = this.getItems.length;

    this
    .timecardItemForm
    .get('itemRows')
    .value
    .forEach((item) => {
      if (item.job != 'DAILY TOTAL') {
        sat += parseFloat(item.sat);
        sun += parseFloat(item.sun);
        mon += parseFloat(item.mon);
        tue += parseFloat(item.tue);
        wed += parseFloat(item.wed);
        thu += parseFloat(item.thu);
        fri += parseFloat(item.fri);

        totalCost += parseFloat(item.total_cost);
      } 
    });

   this
   .getItems
   .controls[length - 1]
   .get('sat')
   .setValue(this.formatNumber(sat.toFixed(2)), {emitEvent: false});

    this
   .getItems
   .controls[length - 1]
   .get('sun')
   .setValue(this.formatNumber(sun.toFixed(2)), {emitEvent: false})

    this
   .getItems
   .controls[length - 1]
   .get('mon')
   .setValue(this.formatNumber(mon.toFixed(2)), {emitEvent: false})

    this
   .getItems
   .controls[length - 1]
   .get('tue')
   .setValue(this.formatNumber(tue.toFixed(2)), {emitEvent: false})

    this
   .getItems
   .controls[length - 1]
   .get('wed')
   .setValue(this.formatNumber(wed.toFixed(2)), {emitEvent: false})

    this
   .getItems
   .controls[length - 1]
   .get('thu')
   .setValue(this.formatNumber(thu.toFixed(2)), {emitEvent: false})

    this
   .getItems
   .controls[length - 1]
   .get('fri')
   .setValue(this.formatNumber(fri.toFixed(2)), {emitEvent: false})

   this
   .getItems
   .controls[length - 1]
   .get('total_hours')
   .setValue(this.formatNumber((sat + sun + mon + tue + wed + thu + fri).toFixed(2)), {emitEvent: false})

   this
   .getItems
   .controls[length - 1]
   .get('total_cost')
   .setValue(this.formatNumber(totalCost.toFixed(2)), {emitEvent: false})
  }

  public onChangeEmergency(event) {
    this.isEmergencyPay = event.target.checked;
  }

  public onCloseOnCall() {
    this.onCall = false;
    this.onCallModalRef.close();
  }

  public formatNumber(n) {
    return this.numService.checkNumber(n);
  }

  public onCloseNewItem() {
    this.initNewItem();
    this.id = 'employee-timecard-6';
    this.isEmergency = false;
    this.isPerDiem = false;
    this.newItemModalRef.close();
  }

  public onCloseSplit() {
    this.loadRateTypes();
    this.splitModalRef.close();
  }

  public onFilter(event, filter) {
    let temp = this.fb.array([]);
    this.values = this.temp.value;

    if (filter == 'job') {
      this.jobFilter = parseInt(event.id) == 0 ? null : event;
    } else if (filter == 'line-item') {
      this.lineItemFilter = parseInt(event.id) == 0 ? null : event;
    } else {
      this.rateTypeFilter = parseInt(event.id) == 0 ? null : event;
    }

    if (!this.jobFilter && !this.lineItemFilter && !this.rateTypeFilter) {
      this.updatingTable = true;
      this.loadTimeCard(this.timecard.id);

      return;
    }

    for (var i = 0; i < this.temp.value.length; i++) {
      if (this.jobFilter) {
        this.values = this.values.filter((value) => {
          return (value.job == this.jobFilter.text || typeof value.id == null);
        });
      }

      if (this.lineItemFilter) {
        this.values = this.values.filter((value) => {
          return (value.line_item == this.lineItemFilter.text || typeof value.id == null);
        });
      }

      if (this.rateTypeFilter) {
        this.values = this.values.filter((value) => {
          return (value.rate_type == this.rateTypeFilter.text || typeof value.id == null);
        });
      }
    }

    this.values.forEach((value) => {
       temp.push(this.fb.group(value));
    });
   
    this.timecardItemForm.controls['itemRows'] = temp;
    this.onRowChanges();
  }

  public onCloseChangeStatus() {
    this.initChangeStatus();
    this.changeStatusModalRef.close();
  }

  public isAP() {
    return this.authService.isAPManager();
  }

  public isSuperOrEstimator() {
    return this.authService.isSuper() || this.authService.isEstimator();
  }

  protected initAllocateForm(id: number) {
    this.allocateModalForm = this.fb.group({
      item_id: id,
      job_id: [0],
      line_item_id: [0],
      estimates: this.fb.array([])
    });
  }

  get getItemEstimates() { return <FormArray>this.allocateModalForm.get('estimates'); }

  protected initEstimatesRow(item) {
    return this.fb.group({
      id: [item.id],
      estimate_name: [item.estimate_name],
      estimate: [item.amount],
      budget: [item.budget],
      rate: [item.rate],
      margin: [item.margin_percentage],
      line_item_id: [item.line_item_id],
      pending_cost: [item.pending_cost],
      actual_cost: [0],
      hours: [0]
    });
  }

  protected onAddingEstimate(item = null) {
    const control = <FormArray>this.allocateModalForm.controls['estimates'] as FormArray;
    control.push(this.initEstimatesRow(item));
  }

  protected listEstimatesByTimecard(id: number) {

    this
    .timeCardService
    .listEstimatesByTimecard(id)
    .subscribe(
    (res) => {
      this.initAllocateForm(id);

      res.data.forEach((item) => {
        this.onAddingEstimate(item);
      });

      if (this.getItemEstimates.length) {
        this.allocateModalRef = this.mS.open(this.allocateModal);
        this.allocateModalRef.result.then((data) => {}, (reason) => {
          this.estimates = [];
        });

      }
    }, 
    (err) => {
      console.log(err);
    })
  }

  public onAllocateItem(item: any) {
    this.unAllocated = item.amount_unallocated;
    this.allocateJobName = item.job_name;
    this.allocateLineItemName = item.line_item_name;
    this.listEstimatesByTimecard(item.id);
  }

  public onAllocateHours(event: any, index: number) {
    this
    .getItemEstimates
    .controls[index]
    .get('actual_cost')
    .setValue(this.formatNumber(parseFloat(event.target.value).toFixed(2)) * 100, {emitEvent: false});
  }

  public allocate() {

    if (this.validateAllocation()) {
      this
      .timeCardService
      .allocateCost(this.parseData())
      .subscribe(
      (res) => {
        this.notificationService.success('Cost Allocated');
        this.onCloseAllocate();
        this.loadForAllocation(this.id);
      }, 
      (err) => {
        console.log(err)
      });
    }
  }

  protected validateAllocation() {
    let totalCost = 0;

    this.allocateModalForm.value.estimates.forEach(item => {
      totalCost += parseFloat(item.actual_cost);
    });

    if (totalCost > (this.unAllocated * 100)) {
      this.notificationService.error('Cost entered greater than unallocated.');

      return false;
    }

    return true;
  }

  public parseData() {
    let data = {
      item_id: this.allocateModalForm.value.item_id,
      item_type: 'TIMECARD',
      estimate_items: []
    }

    this.allocateModalForm.value.estimates.forEach(item => {
      data.estimate_items.push({ id: item.id, amount: item.actual_cost })
    });

    return data;
  }

  public onCloseAllocate() {
    this.estimates = [];
    this.allocateModalRef.close();
  }

  public isNotFullyAllocated(item: any) {
    return item.status != 'FULL' && !this.fullyPaid() && this.isNotApprovedByCurrentUser();
  }
}
