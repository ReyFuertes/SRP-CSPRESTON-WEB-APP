import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTotalsInfoModalComponent } from './job-totals-info-modal.component';

describe('JobTotalsInfoModalComponent', () => {
  let component: JobTotalsInfoModalComponent;
  let fixture: ComponentFixture<JobTotalsInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobTotalsInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTotalsInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
