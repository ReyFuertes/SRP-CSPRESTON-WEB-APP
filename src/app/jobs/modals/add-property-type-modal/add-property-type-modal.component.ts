import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectOption } from '../../../shared/interfaces/Forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../job.service';

@Component({
             selector: 'add-property-type-modal',
             templateUrl: './add-property-type-modal.component.html',
             styleUrls: [ './add-property-type-modal.component.scss' ],
             exportAs: 'addPropertyTypeModal',
             providers: [
              JobService
             ]
           })
export class AddPropertyTypeModalComponent implements OnInit {
  
  @ViewChild('modal') modal;
  @Output() onModalSubmit = new EventEmitter<SelectOption>();
  
  propertyTypeForm: FormGroup;
  
  constructor (private modalService: NgbModal, private formBuilder: FormBuilder, private jobService: JobService) {
    this.propertyTypeForm = formBuilder.group(
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
          name: this.propertyTypeForm.get('name').value
        };

        this.jobService
          .createPropertyType(data)
          .subscribe(
            (res) => {
              console.log(res)
            },
            (err) => {
              console.log(err)
            }
          );

        this.onModalSubmit.emit(
          { value: this.propertyTypeForm.get('name').value, name: this.propertyTypeForm.get('name').value });
      }
      this.propertyTypeForm.reset();
    }, () => {});
  }
  
}
