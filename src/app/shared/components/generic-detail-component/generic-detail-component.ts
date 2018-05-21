import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import { NgForm } from '@angular/forms';

export abstract class GenericDetailComponent<T>  implements OnInit{
  @ViewChild('myForm') form: NgForm;
    
  protected abstract onLoad(entity: T): void;

  constructor() {}

  ngOnInit(): void {
    // for(var key in this.form.controls){
    //   this.form.controls[key].markAsPristine();
    //   console.log('this.form.controls[key]', this.form.controls[key]);
    // }
    for(var key in this.form.controls){
      console.log('GenericDetailComponent', key);
    }
  }
  


  ngOnDestroy(): void {
  }
}