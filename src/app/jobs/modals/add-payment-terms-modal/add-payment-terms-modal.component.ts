import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectOption } from '../../../shared/interfaces/Forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../job.service';

@Component({
             selector: 'add-payment-terms-modal',
             templateUrl: './add-payment-terms-modal.component.html',
             styleUrls: [ './add-payment-terms-modal.component.scss' ],
             exportAs: 'addPaymentTermsModal',
             providers: [
              JobService
             ]
           })
export class AddPaymentTermsModalComponent implements OnInit {
  
  @ViewChild('modal') modal;
  @Output() onModalSubmit = new EventEmitter<SelectOption>();
  
  paymentTermsForm: FormGroup;
  
  constructor (private modalService: NgbModal, private formBuilder: FormBuilder, private jobService: JobService) {
    this.paymentTermsForm = formBuilder.group(
      {
        name: [ '', Validators.compose([ Validators.required, Validators.maxLength(255) ]) ]
      });
  }
  
  ngOnInit () {
  }
  
  open () {
    this.modalService.open(this.modal).result.then((result) => {
      if ( result ) {
        const data = {
          name: this.paymentTermsForm.get('name').value
        };

        this.jobService
          .createPaymentTerm(data)
          .subscribe(
            (res) => {
              console.log(res)
            },
            (err) => {
              console.log(err)
            }
          );

        this.onModalSubmit.emit(
          { value: this.paymentTermsForm.get('name').value, name: this.paymentTermsForm.get('name').value });
      }
      this.paymentTermsForm.reset();
    }, () => {});
  }
  
}
