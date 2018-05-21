import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageContactsModalComponent } from './manage-contacts-modal.component';

describe('ManageContactsModalComponent', () => {
  let component: ManageContactsModalComponent;
  let fixture: ComponentFixture<ManageContactsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageContactsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageContactsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
