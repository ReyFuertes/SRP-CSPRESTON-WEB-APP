import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocatePendingCostsModalComponent } from './allocate-pending-costs-modal.component';

describe('AllocatePendingCostsModalComponent', () => {
  let component: AllocatePendingCostsModalComponent;
  let fixture: ComponentFixture<AllocatePendingCostsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocatePendingCostsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatePendingCostsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
