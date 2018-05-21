import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsInfoModalComponent } from './documents-info-modal.component';

describe('DocumentsInfoModalComponent', () => {
  let component: DocumentsInfoModalComponent;
  let fixture: ComponentFixture<DocumentsInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
