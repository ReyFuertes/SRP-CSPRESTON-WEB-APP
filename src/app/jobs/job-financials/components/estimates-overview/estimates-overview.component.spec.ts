import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatesOverviewComponent } from './estimates-overview.component';

describe('EstimatesOverviewComponent', () => {
  let component: EstimatesOverviewComponent;
  let fixture: ComponentFixture<EstimatesOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimatesOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
