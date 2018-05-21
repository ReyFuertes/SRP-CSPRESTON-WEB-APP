import { CustomerPhone } from './../../../models/customer-information.model';
import { IDropdownSimpleListItem } from './../../../models/dropdown-list-items.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'srp-input-dropdown-selector',
  templateUrl: './input-dropdown-selector.component.html',
  styleUrls: ['./input-dropdown-selector.component.scss']
})
export class InputDropdownSelectorComponent implements OnInit {
  @Input()
  public dropdownOptions: IDropdownSimpleListItem[] = [];

  @Input()
  public isDefaultFirstItem: boolean = false;

  @Input()
  public dropdownLabel: string = 'Select';

  @Input()
  public inputPlaceholder: string = '';

  public inputValue: string = '';
  public optionValue: string;
  public objOption: any;

  @Output()
  public selectedItemChange = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
    if (this.dropdownOptions && this.isDefaultFirstItem === true) {
      this.dropdownLabel = this.dropdownOptions[0].name;
      this.objOption = {
        type: this.dropdownOptions[0].name
      };
      this.selectedItemChange.emit(this.objOption);
    }
  }

  public onBlur(): void {
    this.objOption = {
      type: this.optionValue ? this.optionValue : this.dropdownOptions[0].name,
      value: this.inputValue ? this.inputValue : ''
    }
    this.selectedItemChange.emit(this.objOption)
  }

  public onSelectOption(option: IDropdownSimpleListItem): void {
    if (option) {
      this.optionValue = option.name;
    }
  }
}
