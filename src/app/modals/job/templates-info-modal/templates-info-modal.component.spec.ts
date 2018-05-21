import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesInfoModalComponent } from './templates-info-modal.component';

describe('TemplatesInfoModalComponent', () => {
  let component: TemplatesInfoModalComponent;
  let fixture: ComponentFixture<TemplatesInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatesInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatesInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
