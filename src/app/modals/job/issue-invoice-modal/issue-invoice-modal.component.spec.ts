import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueInvoiceModalComponent } from './issue-invoice-modal.component';

describe('IssueInvoiceModalComponent', () => {
  let component: IssueInvoiceModalComponent;
  let fixture: ComponentFixture<IssueInvoiceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueInvoiceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueInvoiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
