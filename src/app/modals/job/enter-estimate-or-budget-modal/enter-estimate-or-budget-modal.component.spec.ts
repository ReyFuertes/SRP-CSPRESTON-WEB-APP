import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterEstimateOrBudgetModalComponent } from './enter-estimate-or-budget-modal.component';

describe('EnterEstimateOrBudgetModalComponent', () => {
  let component: EnterEstimateOrBudgetModalComponent;
  let fixture: ComponentFixture<EnterEstimateOrBudgetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterEstimateOrBudgetModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterEstimateOrBudgetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
