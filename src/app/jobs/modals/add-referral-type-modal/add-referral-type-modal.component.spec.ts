import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReferralTypeModalComponent } from './add-referral-type-modal.component';

describe('AddReferralTypeModalComponent', () => {
  let component: AddReferralTypeModalComponent;
  let fixture: ComponentFixture<AddReferralTypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReferralTypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReferralTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
