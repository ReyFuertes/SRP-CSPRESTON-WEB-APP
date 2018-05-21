import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateInfoModalComponent } from './estimate-info-modal.component';

describe('EstimateInfoModalComponent', () => {
  let component: EstimateInfoModalComponent;
  let fixture: ComponentFixture<EstimateInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimateInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
