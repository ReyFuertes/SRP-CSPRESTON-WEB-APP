import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailsInfoModalComponent } from './job-details-info-modal.component';

describe('JobDetailsInfoModalComponent', () => {
  let component: JobDetailsInfoModalComponent;
  let fixture: ComponentFixture<JobDetailsInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDetailsInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailsInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
