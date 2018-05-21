import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectOption } from '../../../shared/interfaces/Forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../../job.service';

@Component({
             selector: 'add-damage-type-modal',
             templateUrl: './add-damage-type-modal.component.html',
             styleUrls: [ './add-damage-type-modal.component.scss' ],
             exportAs: 'addDamageTypeModal',
             providers: [
              JobService
             ]
           })
export class AddDamageTypeModalComponent implements OnInit {
  
  @ViewChild('modal') modal;
  @Output() onModalSubmit = new EventEmitter<SelectOption>();
  
  damageTypeForm: FormGroup;
  
  constructor (private modalService: NgbModal, private formBuilder: FormBuilder, private jobService: JobService) {
    this.damageTypeForm = formBuilder.group(
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
          name: this.damageTypeForm.get('name').value
        };

        this.jobService
          .createDamageType(data)
          .subscribe(
            (res) => {
              console.log(res)
            },
            (err) => {
              console.log(err)
            }
          );

        this.onModalSubmit.emit(
          { value: this.damageTypeForm.get('name').value, name: this.damageTypeForm.get('name').value });
      }
      this.damageTypeForm.reset();
    }, () => {});
  }
  
}
