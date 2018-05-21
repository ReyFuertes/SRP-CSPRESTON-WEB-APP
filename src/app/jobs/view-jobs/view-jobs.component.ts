import { JobService } from './../job.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Job } from '../../models/job.model';

@Component({
  selector: 'srp-view-jobs',
  templateUrl: './view-jobs.component.html',
  styleUrls: ['./view-jobs.component.scss']
})
export class ViewJobsComponent implements OnInit {
  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: ''
    },
    {
      text: "View Jobs",
      path: ''
    }
  ];

  public jobs: Array<Job>;
  public loading: boolean = true;

  public page = 1;
  public limit = 25;
  public totalJobs = 0;

  constructor(private router: Router, private jobService: JobService) {
  }

  ngOnInit(): void {
    this.showJobs({ page: 0 });
  }

  public onAddJob(): void {
    this.router.navigate(['/add-job']);
  }

  public onEditJob = (id: number) => {
    if (id) {
      this.router.navigate(['/edit-job/', id]);
    }
  }

  public showJobs = (pageInfo) => {
    this.page = pageInfo.page + 1;
    this.jobService.getJobs('?limit=' + this.limit + '&page=' + this.page).subscribe(res => {

      this.jobs = res.data;
      this.totalJobs = res.meta.pagination.total;

      this.loading = false;
    }, (err) => {
      console.log(err);
    });
  }

  public getDocuments(id: string): void {
    if (id) {
      this.router.navigate(['/job-documents', id]);
    }
  }

  public getJobDisplay(job): void {
  }

  public getFinancials(id: string): void {
    if (id) {
      this.router.navigate(['/financials', id]);
    }
  }
}
