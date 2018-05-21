import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobTypeModalComponent } from './add-job-type-modal.component';

describe('AddJobTypeModalComponent', () => {
  let component: AddJobTypeModalComponent;
  let fixture: ComponentFixture<AddJobTypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddJobTypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
