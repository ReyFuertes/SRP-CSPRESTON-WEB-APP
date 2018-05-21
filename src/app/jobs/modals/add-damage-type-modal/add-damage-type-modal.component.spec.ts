import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDamageTypeModalComponent } from './add-damage-type-modal.component';

describe('AddDamageTypeModalComponent', () => {
  let component: AddDamageTypeModalComponent;
  let fixture: ComponentFixture<AddDamageTypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDamageTypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDamageTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
