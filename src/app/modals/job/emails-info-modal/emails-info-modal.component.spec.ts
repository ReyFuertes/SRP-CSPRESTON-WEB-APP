import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsInfoModalComponent } from './emails-info-modal.component';

describe('EmailsInfoModalComponent', () => {
  let component: EmailsInfoModalComponent;
  let fixture: ComponentFixture<EmailsInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailsInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
