import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectOption } from '../../../shared/interfaces/Forms';
import { JobService } from '../../job.service';

@Component({
             selector: 'add-job-type-modal',
             templateUrl: './add-job-type-modal.component.html',
             styleUrls: [ './add-job-type-modal.component.scss' ],
             exportAs: 'addJobTypeModal',
             providers: [
              JobService
             ]
           })
export class AddJobTypeModalComponent implements OnInit {
  
  @ViewChild('modal') modal;
  @Output() onModalSubmit = new EventEmitter<SelectOption>();
  
  jobTypeForm: FormGroup;
  
  constructor (private modalService: NgbModal, private formBuilder: FormBuilder, private jobService: JobService) {
    this.jobTypeForm = formBuilder.group(
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
          name: this.jobTypeForm.get('name').value
        };

        this.jobService
          .createJobType(data)
          .subscribe(
            (res) => {
              console.log(res)
            },
            (err) => {
              console.log(err)
            }
          );

        this.onModalSubmit.emit(
          { value: this.jobTypeForm.get('name').value, name: this.jobTypeForm.get('name').value });
      }
      this.jobTypeForm.reset();
    }, () => {});
  }
  
}
