import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pageerreue1Component } from './pageerreue1.component';

describe('Pageerreue1Component', () => {
  let component: Pageerreue1Component;
  let fixture: ComponentFixture<Pageerreue1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Pageerreue1Component]
    });
    fixture = TestBed.createComponent(Pageerreue1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
