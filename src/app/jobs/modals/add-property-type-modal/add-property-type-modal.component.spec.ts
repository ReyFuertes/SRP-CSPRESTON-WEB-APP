import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropertyTypeModalComponent } from './add-property-type-modal.component';

describe('AddPropertyTypeModalComponent', () => {
  let component: AddPropertyTypeModalComponent;
  let fixture: ComponentFixture<AddPropertyTypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPropertyTypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropertyTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
