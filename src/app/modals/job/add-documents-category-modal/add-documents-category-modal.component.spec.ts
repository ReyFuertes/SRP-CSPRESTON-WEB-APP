import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDocumentsCategoryModalComponent } from './add-documents-category-modal.component';

describe('AddDocumentsCategoryModalComponent', () => {
  let component: AddDocumentsCategoryModalComponent;
  let fixture: ComponentFixture<AddDocumentsCategoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDocumentsCategoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDocumentsCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
