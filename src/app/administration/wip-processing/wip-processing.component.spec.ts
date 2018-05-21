import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WipProcessingComponent } from './wip-processing.component';

describe('WipProcessingComponent', () => {
  let component: WipProcessingComponent;
  let fixture: ComponentFixture<WipProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WipProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WipProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
