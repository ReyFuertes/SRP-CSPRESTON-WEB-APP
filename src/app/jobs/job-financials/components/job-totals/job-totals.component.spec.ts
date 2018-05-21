import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTotalsComponent } from './job-totals.component';

describe('JobTotalsComponent', () => {
  let component: JobTotalsComponent;
  let fixture: ComponentFixture<JobTotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobTotalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
