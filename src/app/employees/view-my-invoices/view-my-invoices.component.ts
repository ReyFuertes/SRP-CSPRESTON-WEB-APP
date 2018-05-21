import { Component, OnInit, ViewChild, ChangeDetectorRef, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FinancialService } from '../../financials/financial.service';
import { JobService } from '../../jobs/job.service';
import { InvoiceService } from '../invoice.service';
import { SharedService } from '../../shared/services/shared.service';

@Component({
    selector: 'app-view-my-invoices',
    templateUrl: './view-my-invoices.component.html',
    styleUrls: ['./view-my-invoices.component.scss'],
    providers: [
      JobService,
      InvoiceService,
      SharedService
    ]
})
export class ViewMyInvoicesComponent implements OnInit {

  public saved = false;
  public message = '';
  public jobs = [];
  public invoices = false;
  public due_date: Date;
  public Object = Object;
  public modalRef;

  createInvoiceForm: FormGroup;

  @ViewChild('createInvoiceModal')
  public createInvoiceModal;
  
  constructor(
    private fb: FormBuilder,
    private jS: JobService,
    private iS: InvoiceService,
    private modalService: NgbModal,
    private ss: SharedService
  ) {
    this.listJobs();
    this.createInvoiceFormInit();
    this.listInvoices();
  }

  public ngOnInit() {
     
  }

  public createInvoiceFormInit() {
    this.createInvoiceForm = this.fb.group(
      {
        job: [ 1, Validators.compose([ Validators.required, Validators.maxLength(255) ]) ],
        invoiceAmount: [ 0, Validators.compose([ Validators.required, Validators.maxLength(255) ]) ],
        dueDate: ''
      });
  }

  public listJobs() {
    this
      .jS
      .listJobs()
      .subscribe(
        (res) => {
           this.jobs = res.data;
        },
        (err) => {
          console.log(err);
        }
        );
  }

  public listInvoices() {
    this
    .iS
    .listMyJobContactInvoiceByStatus()
    .subscribe(
      (res) => {
         this.invoices = res.data;
      },
      (err) => {
        console.log(err);
      }
      );
  }

  public onCreateInvoice() {
    this.modalRef = this.modalService.open(this.createInvoiceModal, { size: 'sm' });
  }

  public createInvoice(form) {
    const data = {
      job_id: form.job,
      invoice_amount: form.invoiceAmount,
      due_date: form.dueDate
    };

    this
      .iS
      .createJobContactInvoice(data)
      .subscribe(
      (res) => {
        this.saved = true;
        this.message = 'Save successful';
        this.listInvoices();

        setInterval(() => {
          this.saved = false;
          this.message = '';
          this.modalRef.close();
        }, 3000);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
