import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tform2Component } from './tform2.component';

describe('Tform2Component', () => {
  let component: Tform2Component;
  let fixture: ComponentFixture<Tform2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Tform2Component]
    });
    fixture = TestBed.createComponent(Tform2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
