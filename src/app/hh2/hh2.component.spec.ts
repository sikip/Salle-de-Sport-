import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hh2Component } from './hh2.component';

describe('Hh2Component', () => {
  let component: Hh2Component;
  let fixture: ComponentFixture<Hh2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Hh2Component]
    });
    fixture = TestBed.createComponent(Hh2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
