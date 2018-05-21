import { IDropdownSimpleListItem } from './../../../models/dropdown-list-items.model';
import { ControlContainer, NgForm, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'srp-dropdown-selector',
  templateUrl: './dropdown-selector.component.html',
  styleUrls: ['./dropdown-selector.component.scss']
})
export class SRPDropdownSelectorComponent implements OnInit, AfterViewInit, OnChanges {
  public selectedItem: any = '';
  public selectorFormGroup: FormGroup;

  @Input()
  public inputName: string = '';

  @Input()
  public validateSelector: boolean;

  @Input()
  public isNew: boolean = false;

  @Input()
  public isDefaultFirstItem: boolean = false;

  private _filterId: any[];
  @Input()
  public set filterId(value: any[]) {
    this._filterId = value;
  }
  public get filterId(): any[] {
    return this._filterId;
  }

  private _dropdownListItems: IDropdownSimpleListItem[];
  @Input()
  public set dropdownListItems(value: IDropdownSimpleListItem[]) {
    this._dropdownListItems = value;
  }
  public get dropdownListItems(): IDropdownSimpleListItem[] {
    return this._dropdownListItems;
  }

  @Output()
  public selectItemChange = new EventEmitter<any>();

  @Output()
  public errorItemChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    this.selectorFormGroup = new FormGroup({
      selectorName: new FormControl('', Validators.required)
    });

    setTimeout(() => {
      if (this.dropdownListItems && this.isDefaultFirstItem === true) {
        this.setDefaultValue(this.dropdownListItems[0]);
      }

      if (this.filterId) {
        this.setCurrentValue(this.filterId);
      }

      this.errorItemChange.emit(this.getErrorState());
    }, 1000);
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.dropdownListItems && this.isDefaultFirstItem === true) {
      setTimeout(() => {
        this.setDefaultValue(this.dropdownListItems[0]);
      }, 1000);
    }
  }

  public onBlur(): void {
    this.errorItemChange.emit(this.getErrorState());
  }

  private getErrorState(): boolean {
    const control = this.selectorFormGroup.controls.selectorName;
    //control.touched && control.invalid || 
    return (control.invalid && this.validateSelector === true);
  }

  private setDefaultValue(value: any): void {
    if (value && value.name) {
      this.selectedItem = value.name;
      this.selectItemChange.emit(value);
    }
  }

  private setCurrentValue(value: any): void {
    const selValue = this.dropdownListItems.filter(i => +i.id === +value || i.value === value.toString());
    if (selValue[0]) {
      this.onSelectItem(selValue[0]);
    }
  }

  public onSelectItem(item: IDropdownSimpleListItem) {
    if (item && item.name) {
      this.selectedItem = item.name;
      this.selectItemChange.emit(item);
      this.errorItemChange.emit(false);
    }
  }
}
