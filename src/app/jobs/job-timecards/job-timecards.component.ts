import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { JobService } from '../../jobs/job.service';
import { SharedService } from '../../shared/services/shared.service';

@Component({
    selector: 'app-job-timecards',
    templateUrl: './job-timecards.component.html',
    styleUrls: ['./job-timecards.component.scss'],
    providers: [
      JobService,
      SharedService
    ]
})

export class JobTimeCardsComponent implements OnInit {

  public timecards = [];
  public listOfTimeCards = false;
  public showJobDetails = false;

  @Input() job;

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
      text: "Timecards",
      path: ''
    }
  ];

  constructor(
    private fb: FormBuilder,
    private jobService: JobService,
    private ss: SharedService
  ) {
    //
  }

  public ngOnInit() {
     this.listTimeCards();
  }

  public listTimeCards() {
    this
      .jobService
      .listTimeCardsByJob(this.job.id)
      .subscribe(
      (res) => {
          this.timecards = res.data
          console.log(res.data);
      },
      (err) => {
        console.log(err);
      }
      );
  }

   public getJobDetails(job) {
    this.job = job;
    this.showJobDetails = true;
  }
}
