import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobService } from '../job.service';
import { ContactService } from '../../contacts/contact.service';
import { FinancialService } from '../../financials/financial.service';
import { InvoiceService } from '../../employees/invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../../notifications/notifications.service';

@Component({
  selector: 'app-job-financials',
  templateUrl: './job-financials.component.html',
  styleUrls: ['./job-financials.component.scss']
})

export class JobFinancialsComponent implements OnInit {

  public id = null;
  public job = null;
  public listOfJobs = false;
  public estimates = [];
  public invoices = [];
  public jobTables = true;
  public jobTabs = false;
  public jobStatus = [];
  public estimate;
  public message;
  public app_message;
  public dis_message;
  public inv_message;
  public modalReference: any;
  public due_date: Date;
  public invoice_id = '';
  public showTimeCardsList = false;

  public deleteModalRef: any;

  @ViewChild('deleteModal')
  public deleteRoleModal: any;

  public breadcrumbs = [
    {
      text: 'Dashboard',
      path: 'dashboard'
    },
    {
      text: "Jobs",
      path:'/view-jobs'
    },
    {
      text: "Financials",
      path: ''
    }
  ];

  @ViewChild('approveEstimateModal')
  public approveEstimateModal;

  @ViewChild('disapproveEstimateModal')
  public disapproveEstimateModal;

  public viewType = 'grid';

  constructor(
    private jobService: JobService,
    private financialService: FinancialService,
    private iS: InvoiceService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private notificationService: NotificationsService
  ) {
    this.message = false;
    this.app_message = false;
    this.dis_message = false;
    this.generateInvoice();
  }

  public ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.listJob();

    window.scrollTo(0, 0);
  }

  public getJobs() {
    this.router.navigate(['/view-jobs']);
  }

  public listJob() {
    this
      .jobService
      .show(this.id)
      .subscribe(
      (res) => {
        this.job = res.data;

        if (this.jobTabs) {
          this.viewTabs(this.job);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  public generateInvoice() {
    this
      .iS
      .generateInvoiceId()
      .subscribe(
      (res) => {
        this.invoice_id = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public viewTables(job) {
    this.jobTables = true;
    this.jobTabs = false;
  }

  public viewTabs(job) {
    this.jobTables = false;
    this.jobTabs = true;
  }

  public isPending(estimate) {
    return estimate.status == "Pending";
  }

  public onApproveEstimate(estimate) {
    this.estimate = estimate;
    this.modalReference = this.modalService.open(this.approveEstimateModal);
  }

  public onDisapproveEstimate(estimate) {
    this.estimate = estimate;
    this.modalReference = this.modalService.open(this.disapproveEstimateModal);
  }

  public approveEstimate(estimate) {
    this.app_message = false;
    this
    .financialService
    .approveEstimate(this.estimate.id)
    .subscribe(
      (res) => {
        this.app_message = 'Approve successful';
        this.listJob();

        setInterval(() => {
          this.modalReference.close();
        }, 4000)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public disapproveEstimate(estimate) {
    this.dis_message = false;
    this
    .financialService
    .disapproveEstimate(this.estimate.id)
    .subscribe(
      (res) => {
        this.dis_message = 'Disapprove successful';
        this.listJob();

        setInterval(() => {
          this.modalReference.close();
        }, 4000)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public showCreateEstimateForm() {
     this.router.navigate(['/estimate/' + this.job.id + '/create']);
  }

  public showTimeCards(job) {

  }

  public isApproved(estimate) {
    return estimate.status == 'Approved';
  }

  public goToEditEstimate(estimate) {
    this.router.navigate(['/estimate/' + estimate.job_id +'/edit', estimate.id])
  }

  public onDelete(estimate) {
    this.estimate = estimate;
    this.deleteModalRef = this.modalService.open(this.deleteRoleModal);
  }

  public delete() {
    this
    .financialService
    .delete(this.estimate.id)
    .subscribe(
      (res) => {
        this.notificationService.success('Delete successful');
        this.closeDelete();
        this.listJob();
      },
      (error) => {
        if (error.message) {
          this.notificationService.error(error.message);
        }
      }
    );
  }

  public closeDelete() {
    this.deleteModalRef.close();
  }

  public viewTypeChange(event) {
    this.viewType = event.type;
  }
}
