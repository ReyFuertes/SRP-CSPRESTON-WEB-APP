import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectOption } from '../../../shared/interfaces/Forms';
import { JobService } from '../../job.service';

@Component({
             selector: 'add-work-type-modal',
             templateUrl: './add-work-type-modal.component.html',
             styleUrls: [ './add-work-type-modal.component.scss' ],
             exportAs: 'addWorkTypeModal',
             providers: [
              JobService
             ]
           })
export class AddWorkTypeModalComponent implements OnInit {
  
  @ViewChild('modal') modal;
  @Output() onModalSubmit = new EventEmitter<SelectOption>();
  
  workTypeForm: FormGroup;
  
  constructor (private modalService: NgbModal, private formBuilder: FormBuilder, private jobService: JobService) {
    this.workTypeForm = formBuilder.group(
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
          name: this.workTypeForm.get('name').value
        };

        this.jobService
          .createWorkType(data)
          .subscribe(
            (res) => {
              console.log(res)
            },
            (err) => {
              console.log(err)
            }
          );

        this.onModalSubmit.emit(
          { value: this.workTypeForm.get('name').value, name: this.workTypeForm.get('name').value });
      }
      this.workTypeForm.reset();
    }, () => {});
  }
  
}
