import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentTermsModalComponent } from './add-payment-terms-modal.component';

describe('AddPaymentTermsModalComponent', () => {
  let component: AddPaymentTermsModalComponent;
  let fixture: ComponentFixture<AddPaymentTermsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPaymentTermsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaymentTermsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
