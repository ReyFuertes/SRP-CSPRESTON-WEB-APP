import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkTypeModalComponent } from './add-work-type-modal.component';

describe('AddWorkTypeModalComponent', () => {
  let component: AddWorkTypeModalComponent;
  let fixture: ComponentFixture<AddWorkTypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWorkTypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
