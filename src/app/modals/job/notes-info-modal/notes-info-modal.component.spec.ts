import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesInfoModalComponent } from './notes-info-modal.component';

describe('NotesInfoModalComponent', () => {
  let component: NotesInfoModalComponent;
  let fixture: ComponentFixture<NotesInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
