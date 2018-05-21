import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectOption } from '../../../shared/interfaces/Forms';
import { JobService } from '../../job.service';

@Component({
             selector: 'add-referral-type-modal',
             templateUrl: './add-referral-type-modal.component.html',
             styleUrls: [ './add-referral-type-modal.component.scss' ],
             exportAs: 'addReferralTypeModal',
             providers: [
              JobService
             ]
           })
export class AddReferralTypeModalComponent implements OnInit {
  
  @ViewChild('modal') modal;
  @Output() onModalSubmit = new EventEmitter<SelectOption>();
  
  referralTypeForm: FormGroup;
  
  constructor (private modalService: NgbModal, private formBuilder: FormBuilder, private jobService: JobService) {
    this.referralTypeForm = formBuilder.group(
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
          name: this.referralTypeForm.get('name').value
        };

        this.jobService
          .createReferralType(data)
          .subscribe(
            (res) => {
              console.log(res)
            },
            (err) => {
              console.log(err)
            }
          );

        this.onModalSubmit.emit(
          { value: this.referralTypeForm.get('name').value, name: this.referralTypeForm.get('name').value });
      }
      this.referralTypeForm.reset();
    }, () => {});
  }
  
}
