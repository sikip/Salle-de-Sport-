import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Succes2Component } from './succes2.component';

describe('Succes2Component', () => {
  let component: Succes2Component;
  let fixture: ComponentFixture<Succes2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Succes2Component]
    });
    fixture = TestBed.createComponent(Succes2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
