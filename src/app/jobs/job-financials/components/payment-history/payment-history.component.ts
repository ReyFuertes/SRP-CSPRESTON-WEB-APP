import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NotificationsService } from '../../../../notifications/notifications.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceService } from '../../../../employees/invoice.service';
import { NumberService } from '../../../../shared/services/number/number.service';
import * as $ from 'jquery';

@Component({
    selector: 'payment-history',
    templateUrl: './payment-history.component.html',
    styleUrls: ['./payment-history.component.scss']
})

export class PaymentHistoryComponent implements OnInit {

	public modalReferenceInvoice: any;

  public modalReferencePayment: any;

	public modalReferenceIssue: any;

	public createInvoiceForm: FormGroup;

	public createPaymentForm: FormGroup;

	public estimatesOption: any[] = [];

	public estimateId = null;

  public invoiceId = null;

	public items: any[] = [];

	public paymentMethods = [{ id: 0, text: 'CASH' }, { id: 1, text: 'CARD' }, { id: 1, text: 'CHECK' }];

	@ViewChild('createInvoiceModal')
 	public createInvoiceModal;

 	@ViewChild('createPaymentModal')
 	public createPaymentModal;

  @ViewChild('issueInvoiceModal')
  public issueInvoiceModal;

 	@Input()
 	public job;

  @Input()
  public id;

  @Input()
  public estimates;

  constructor(
  	private iS: InvoiceService,
  	private modalService: NgbModal,
  	private fb: FormBuilder,
  	private notificationService: NotificationsService,
  	private numberService: NumberService) { }

  ngOnInit() {
  	this.listInvoicesAndPayment();
  	this.loadEstimates();
  	this.createInvoiceFormInit();
  	this.createPaymentFormInit();
  }

  protected listInvoicesAndPayment() {
    this
    .iS
    .listInvoiceAndPaymentsByJob(this.id)
    .subscribe(
      (res) => {
      	this.items = [];
      	let keys = Object.keys(res.data);
      	
      	keys.forEach(key => {
      		this.items.push(res.data[key]);
      	});
      },
      (error) => {
        console.log(error);
      }
    );
	}

  protected loadEstimates() {
  	this.estimates.forEach((item) => {
  		this.estimatesOption.push({ id: item.id, text: item.name });
  	});
  }

  protected createInvoiceFormInit() {
    this.createInvoiceForm = this.fb.group(
      {
        estimate_id: [ this.estimateId, Validators.compose([ Validators.required, Validators.maxLength(255) ]) ],
        invoice_id: [ '', Validators.compose([ Validators.required, Validators.maxLength(255) ]) ],
        invoice_amount: [ 0, Validators.compose([ Validators.required, Validators.maxLength(255) ]) ],
        due_date: [ '', Validators.compose([ Validators.required ]) ]
    	});
	}

	protected createPaymentFormInit() {
    this.createPaymentForm = this.fb.group(
      {
        amount_received: [ 0, Validators.compose([ Validators.required, Validators.maxLength(255) ]) ],
        payment_date: [ '', Validators.compose([ Validators.required, Validators.maxLength(255) ]) ],
        reference_no: [ '', Validators.compose([ Validators.required ]) ],
        payment_method: [ 'CASH' ],
        invoices: this.fb.array([])
    	});
	}

	public onChangeEstimate(event) {
		this.estimateId = event.id;
	}

	public onChangeInvoiceId(event) {
		this
		.createInvoiceForm
		.get('invoice_id')
		.setValue(event.target.value, {emitEvent: false});
	}

	public onChangeInvoiceAmount(event) {
		this
		.createInvoiceForm
		.get('invoice_amount')
		.setValue(event.target.value, {emitEvent: false});
	}

	public onChangeDueDate(event) {
		this
		.createInvoiceForm
		.get('due_date')
		.setValue(event.target.value, {emitEvent: false});
	}

  public onCreateInvoice(estimate) {
  	this.modalReferenceInvoice = this.modalService.open(this.createInvoiceModal, { size: 'sm',  });

  	this.modalReferenceInvoice.result.then((data) => {}, (reason) => {
        this.createInvoiceFormInit();
    });
	}

	public createInvoice() {
    this
    .iS
    .createEstimateInvoice(this.estimateId, this.parseData())
    .subscribe(
      (res) => {
      	this.listInvoicesAndPayment();
      	this.modalReferenceInvoice.close();
      	this.notificationService.success('Invoice created.');
      },
      (error) => {
        console.log(error);
      }
    );
	}

	protected parseData() {
		let d = new Date(Date.parse(this.createInvoiceForm.value.due_date));
		let dueDate = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;

		return {
			invoice_id: this.createInvoiceForm.value.invoice_id,
			invoice_amount: parseFloat(this.createInvoiceForm.value.invoice_amount) * 100,
			due_date: dueDate
		}
	}

	protected formatNumber(n) {
    return isNaN(this.numberService.checkNumber(n)) ? 0 : this.numberService.checkNumber(n);
  }

  public onCancel() {
  	this.modalReferenceInvoice.close();
  	this.createInvoiceFormInit();
  }

  public onSelectAll(event) {
    $('.invoice-cb').click();
    $('.invoice-cb').prop('checked', event.target.checked);
  }

  public includeInvoice(event, invoice) {
  	let id = parseInt(invoice.id);

  	if ($(event.target).hasClass('invoice-cb')) {
  		if (event.target.checked) {
  			this.onAddingNewLineItem(invoice);
  		} else {
  			this
  			.getInvoices
  			.value
  			.forEach((item, index) => {
  				if (item.id == id) {
  					this.onRemovingLineItem(index);	
  				}
  			});
  		}
  	}
  }

  protected initItemRows(invoice: any) {
  	return this.fb.group({
  		id: invoice.id,
  		invoice_id: invoice.invoice_num,
  		amount: 0
  	});
  }

  get getInvoices() { return <FormArray>this.createPaymentForm.get('invoices'); }

	protected onAddingNewLineItem(invoice = null) {
    const control = <FormArray>this.createPaymentForm.controls['invoices'] as FormArray;
    control.push(this.initItemRows(invoice));
  }

  protected onRemovingLineItem(index) {
    const control = <FormArray>this.createPaymentForm.controls['invoices'] as FormArray;
    control.removeAt(index);
  }

	public onCreatePayment() {
		if (this.getInvoices.length) {
	  	this.modalReferencePayment = this.modalService.open(this.createPaymentModal, { size: 'sm',  });

	  	this.modalReferencePayment.result.then((data) => {}, (reason) => {
	        this.resetInvoiceForm();
      });
  	}
	}

  protected resetInvoiceForm() {
    this.createPaymentFormInit();
    this
    .getInvoices
    .value
    .forEach((item, index) => {
      this.onRemovingLineItem(index);
    });

    $('.form-checkbox').prop('checked', false);
  }

  public onMakePayment(invoice: any) {
    this.onAddingNewLineItem(invoice);
    this.onCreatePayment();
  }

	public onChangeAmountReceived(event) {
		this
		.createPaymentForm
		.get('amount_received')
		.setValue(event.target.value, {emitEvent: false});
	}

	public onChangePaymentDate(event) {
		this
		.createPaymentForm
		.get('payment_date')
		.setValue(event.target.value, {emitEvent: false});
	}

	public onChangeRefNo(event) {
		this
		.createPaymentForm
		.get('reference_no')
		.setValue(event.target.value, {emitEvent: false});
	}

	public onChangePaymentMethod(event) {
		this
		.createPaymentForm
		.get('payment_method')
		.setValue(event.text, {emitEvent: false});
	}

	public onChangeAmount(event, index) {
		this
		.getInvoices
		.controls[index]
		.get('amount')
		.setValue(event.target.value, {emitEvent: false});
	}

	public createPayment() {
		this
    .iS
    .createPayment(this.job.id, this.parsePaymentData())
    .subscribe(
      (res) => {
      	this.listInvoicesAndPayment();
      	this.modalReferencePayment.close();
      	this.notificationService.success('Payment created.');
      },
      (error) => {
        console.log(error);
      }
    );
	}

	protected parsePaymentData() {
		let d = new Date(Date.parse(this.createPaymentForm.value.payment_date));
		let paymentDate = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;

		let data = {
      amount_received: parseFloat(this.createPaymentForm.value.amount_received) * 100,
      payment_date: paymentDate,
      reference_no: this.createPaymentForm.value.reference_no,
      payment_method: this.createPaymentForm.value.payment_method,
      invoices: []
		}

		this
		.getInvoices
		.value
		.forEach((item) => {
			data.invoices.push({ id: item.id, amount: parseFloat(item.amount) * 100 });
		});

		return data;
	}

	public onCancelPayment() {
  	this.modalReferencePayment.close();
    this.resetInvoiceForm();
  }

  public onIssueInvoice(item: any) {
    this.invoiceId = item.id;
    this.modalReferenceIssue = this.modalService.open(this.issueInvoiceModal);
  }

  public issueInvoice() {
    this
    .iS
    .issueInvoice(this.invoiceId)
    .subscribe(
    (res) => {
      this.listInvoicesAndPayment();
      this.modalReferenceIssue.close();
      this.notificationService.success('Invoice issued.');
    },
    (err) => {
      console.log(err);
    })
  }
}
