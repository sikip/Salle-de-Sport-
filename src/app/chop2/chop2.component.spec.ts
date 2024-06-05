import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chop2Component } from './chop2.component';

describe('Chop2Component', () => {
  let component: Chop2Component;
  let fixture: ComponentFixture<Chop2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Chop2Component]
    });
    fixture = TestBed.createComponent(Chop2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
