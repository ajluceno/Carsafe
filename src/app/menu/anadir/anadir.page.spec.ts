import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirPage } from './anadir.page';

describe('AnadirPage', () => {
  let component: AnadirPage;
  let fixture: ComponentFixture<AnadirPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnadirPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnadirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
