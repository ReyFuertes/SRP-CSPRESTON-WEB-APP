import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsInfoModalComponent } from './contacts-info-modal.component';

describe('ContactsInfoModalComponent', () => {
  let component: ContactsInfoModalComponent;
  let fixture: ComponentFixture<ContactsInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
