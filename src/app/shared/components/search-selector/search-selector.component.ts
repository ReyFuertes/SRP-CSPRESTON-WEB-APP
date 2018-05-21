import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { IDropdownSimpleListItem } from '../../../models/dropdown-list-items.model';

@Component({
  selector: 'srp-search-selector',
  templateUrl: './search-selector.component.html',
  styleUrls: ['./search-selector.component.scss']
})
export class SearchSelectorComponent implements OnInit {
  public isShow: boolean = false;
  public selectedItem: string = '';

  @Input()
  public placeholder: string;

  public selectorFormGroup: FormGroup;

  private _validateSelector: boolean;
  @Input()
  public set validateSelector(value: boolean) {
    this._validateSelector = value;
  }
  public get validateSelector(): boolean {
    return this._validateSelector;
  }

  private _items: any[];
  @Input()
  public set items(value: any[]) {
    this._items = value;
  }

  public get items(): any[] {
    return this._items;
  }

  @Input()
  set setValue(value: any) {
    if (value)
      this.onSelectItem(value);
  }

  @Output()
  public inputValueChange = new EventEmitter<any>();

  @Output()
  public errorItemChange = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
    this.selectorFormGroup = new FormGroup({
      selectorName: new FormControl('', Validators.required)
    });
  }

  private getErrorState(): boolean {
    const control = this.selectorFormGroup.controls.selectorName;
    return control.touched && control.invalid || (control.invalid && this.validateSelector === true);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let items in changes) {
      let chng = changes[items];
      if (chng.currentValue && chng.previousValue) {
        this.selectedItem = '';
      }
    }
  }

  public filteredSearchList: any[] = [];
  public onDropdownKeyupInput(event) {
    let _searchTerm = event.target.value.toLowerCase();
    if (_searchTerm.length >= 3) {
      this.isShow = true;

      this.filteredSearchList = this.items.filter((item) => {
        return item.name.toLowerCase().indexOf(_searchTerm) !== -1;
      })
    } else {
      this.isShow = false;
    }
  }

  public onBlur(event: any) {
    if (event.target.tagName.toUpperCase() === 'INPUT') {
      if (event.target.value === '') {
        this.inputValueChange.emit(null);
      }

      this.errorItemChange.emit(this.getErrorState());

      setTimeout(() => {
        this.isShow = false;
      }, 200);
    }
  }

  public onSelectItem(item: any) {
    this.inputValueChange.emit(item);
    this.selectedItem = item.name;
  }
}
