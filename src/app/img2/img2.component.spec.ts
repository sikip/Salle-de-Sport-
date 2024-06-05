import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Img2Component } from './img2.component';

describe('Img2Component', () => {
  let component: Img2Component;
  let fixture: ComponentFixture<Img2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Img2Component]
    });
    fixture = TestBed.createComponent(Img2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
