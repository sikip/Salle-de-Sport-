import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Empl2Component } from './empl2.component';

describe('Empl2Component', () => {
  let component: Empl2Component;
  let fixture: ComponentFixture<Empl2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Empl2Component]
    });
    fixture = TestBed.createComponent(Empl2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
