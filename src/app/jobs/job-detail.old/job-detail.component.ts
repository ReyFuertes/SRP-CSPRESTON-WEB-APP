import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobService } from '../job.service';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss'],
  providers: [
    JobService,
    ContactService
  ]
})

export class JobDetailComponent implements OnInit {
  public show = true;
  public showTimeCardsList = false;
  public showEstimateForm = false;
  public listOfJobs = false;
  public jobEmployees = [];
  public employeePrimaryRoles = [];

  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: ''
    },
    {
      text: "View Jobs",
      path: '/view-jobs'
    },
    {
      text: "Details",
      path: ''
    }
  ];

  @Input() job;

  constructor(
    private jobService: JobService,
    private contactService: ContactService,
    private fb: FormBuilder
  ) {


  }

  public ngOnInit() {
    this.listEmployeePrimaryRole();

    window.scrollTo(0, 0);
  }

  public showCreateEstimateForm(job) {
    this.job = job;
    this.show = false;
    this.showTimeCardsList = false;
    this.showEstimateForm = true;
    this.listOfJobs = false;
  }

  public showTimeCards(job) {
    this.job = job;
    this.show = false;
    this.showTimeCardsList = true;
    this.showEstimateForm = false;
    this.listOfJobs = false;
  }

  public getJobs() {
    this.show = false;
    this.showTimeCardsList = false;
    this.showEstimateForm = false;
    this.listOfJobs = true;
  }

  public listEmployeeJobRole(data) {
    this.contactService
      .getEmployeeJobRole(this.job.id)
      .subscribe(
      (res) => {
        this.jobEmployees = res.data;
      },
      (err) => {
        console.log(err);
      }
      );
  }

  public listEmployeePrimaryRole() {
    this.contactService
      .listEmployeePrimaryRoles()
      .subscribe(
      (res) => {
        let roleIds = [];
        this.employeePrimaryRoles = res.data;

        this.employeePrimaryRoles.forEach(function (role) {
          roleIds.push(role.id);
        });

        this.listEmployeeJobRole({
          job_id: this.job.id,
          role_ids: roleIds,
          role_type: 'EmployeeRole'
        });
      },
      (err) => {
        console.log(err);
      }
      );
  }

}
