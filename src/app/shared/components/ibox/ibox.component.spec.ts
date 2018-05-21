import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IboxComponent } from './ibox.component';

describe('IboxComponent', () => {
  let component: IboxComponent;
  let fixture: ComponentFixture<IboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
