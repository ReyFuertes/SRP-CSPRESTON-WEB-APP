import { Observable } from 'rxjs/Rx';
import { Job } from './../../../models/job.model';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { IDropdownSimpleListItem } from './../../../models/dropdown-list-items.model';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../../job.service';
import { CategoryService } from '../../../categories/category.service';
import { range, each } from 'underscore';
import * as moment from 'moment';

@Component({
  selector: 'srp-job-information',
  templateUrl: './job-information.component.html',
  styleUrls: ['./job-information.component.scss']
})

export class JobInformationComponent implements OnInit {
  @ViewChild('jobInformationForm') jobInformationForm: NgForm;

  public prevTabIndex = 1;
  public nextTabIndex = 3;
  public ID: number;

  public jobTypes: any[] = [];
  public propertyTypes: IDropdownSimpleListItem[] = [];
  public damageTypes: IDropdownSimpleListItem[] = [];
  public referralTypes: IDropdownSimpleListItem[] = [];
  public workTypes: IDropdownSimpleListItem[] = [];
  public jobProbabilities: IDropdownSimpleListItem[] = [];
  public yearsBuilt: IDropdownSimpleListItem[] = [];
  public jobStatus: any[] = [];
  public validateSelector: boolean = false;

  @Input()
  public jobInfo: Job;

  @Input()
  public isNew: boolean = false;

  @Input()
  public paymentTerms: any[];

  @Input()
  public isVisible: boolean = false;

  @Output()
  public tabChange = new EventEmitter<number>();

  @Output()
  public jobInformationChange = new EventEmitter<Job>();

  @ViewChild('addJobTypeModal') addJobTypeModal;

  @Output()
  public onChangeErrors = new EventEmitter<any>();

  constructor(private jobService: JobService, private formBuilder: FormBuilder, private categoryService: CategoryService) {
    this.listStatus();
    this.listJobByType('job-types');
    this.listJobByType('work-types');
    this.listJobByType('property-types');
    this.listJobByType('damage-types');
    this.listJobByType('referral-types');
  }

  ngOnInit() {
    each(<number[]>range(0, 100), (neg: number) => {
      const year = moment().subtract(neg, 'years').format('Y');
      this.yearsBuilt.push({ id: +year, name: year, value: year });
    });

    each(<number[]>range(1, 11), (num: number) => {
      this.jobProbabilities.push({ id: num, name: num.toString(), value: num.toString() });
    });
  }

  paymentTermsAdded(paymentTerm): void {
    this.paymentTerms.push(paymentTerm);
  }

  public invalidControls: any[] = [];
  public getInvalidControls = () => {
    const controls = this.jobInformationForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        controls[name].markAsDirty();
        controls[name].markAsTouched();

        if (this.invalidControls.indexOf(name) === -1) {
          this.invalidControls.push(name);
        }
      } else {
        //remove valid controls
        const index: number = this.invalidControls.indexOf(name);
        if (index !== -1) {
          this.invalidControls.splice(index, 1);
        }
      }
    }

    const jobInfoHasErrors = this.invalidControls.length > 0 ? true : false;
    this.onChangeErrors.emit({ comp: 'jobInfoHasErrors', status: jobInfoHasErrors });
  }

  public listStatus() {
    this.categoryService.listJobStatus().subscribe((res) => {
      if (res.data) {
        res.data.forEach(i => {
          this.jobStatus.push({ id: +i.id, name: i.name.toString(), value: i.id.toString() })
        });
      }
    }, (err) => {
      console.log(err);
    });
  }

  public onTabChange(tabIndex: number) {
    this.validateSelector = true;
    this.getInvalidControls();

    this.isVisible = false;
    this.tabChange.emit(tabIndex);
    this.jobInformationChange.emit(this.jobInfo)
  }

  public listJobByType(type: string) {
    this.jobService.listByType(type).subscribe((res) => {
      switch (type) {
        case 'job-types':
          res.data.forEach((jobType) => {
            this.jobTypes.push({ name: jobType.name, value: jobType.id.toString(), id: +jobType.id });
          });
          break;
        case 'work-types':
          res.data.forEach((workType) => {
            this.workTypes.push({ name: workType.name, value: workType.id.toString(), id: +workType.id });
          });
          break;
        case 'property-types':
          res.data.forEach((propertyType) => {
            this.propertyTypes.push({ name: propertyType.name, value: propertyType.id.toString(), id: +propertyType.id });
          });
          break;
        case 'damage-types':
          res.data.forEach((damageType) => {
            this.damageTypes.push({ name: damageType.name, value: damageType.id.toString(), id: +damageType.id });
          });
          break;
        case 'referral-types':
          res.data.forEach((referralType) => {
            this.referralTypes.push({ name: referralType.name, value: referralType.id.toString(), id: +referralType.id });
          });
          break;
      }
    }, (err) => {
      console.log(err);
    });
  }

  jobTypeAdded(jobType: any): void {
    this.jobTypes.push(jobType);
    // setTimeout(() => { this.jobInformationSheet.get('jobType').setValue(jobType.value) });
  }

  damageTypeAdded(damageType: any): void {
    this.damageTypes.push(damageType);
    // setTimeout(() => { this.jobInformationSheet.get('damageType').setValue(damageType.value) });
  }

  propertyTypeAdded(propertyType: any): void {
    this.propertyTypes.push(propertyType);
    // setTimeout(() => { this.jobInformationSheet.get('propertyType').setValue(propertyType.value) });
  }

  referralTypeAdded(referralType: any): void {
    this.referralTypes.push(referralType);
    // setTimeout(() => { this.jobInformationSheet.get('referralType').setValue(referralType.value) });
  }

  workTypeAdded(workType: any): void {
    this.workTypes.push(workType);
    // setTimeout(() => { this.jobInformationSheet.get('workType').setValue(workType.value) });
  }

}
