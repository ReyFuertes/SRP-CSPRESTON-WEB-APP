/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabResolverComponent } from './tab-resolver.component';

describe('TabResolverComponent', () => {
  let component: TabResolverComponent;
  let fixture: ComponentFixture<TabResolverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabResolverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabResolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
