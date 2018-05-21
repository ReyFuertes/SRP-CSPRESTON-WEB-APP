import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectOption } from '../../shared/interfaces/Forms';

@Component({
             selector: 'srp-dropdown',
             templateUrl: './select.component.html',
             styleUrls: [ './select.component.scss' ]
           })
export class SelectComponent implements OnInit {
  @Input() options:[SelectOption];
  @Input() disabled:boolean = false;
  @Input() notAvailableText:string;
  @Input() model:any;
  
  modelValue:any;
  
  @Output() modelChange = new EventEmitter();
  
  constructor () { }
  
  ngOnInit () {
  }
  
  get modelV(){
    return this.model;
  }
  
  set modelV(val) {
    this.model = val;
    this.modelChange.emit(this.model);
  }
}
