import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tform3Component } from './tform3.component';

describe('Tform3Component', () => {
  let component: Tform3Component;
  let fixture: ComponentFixture<Tform3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Tform3Component]
    });
    fixture = TestBed.createComponent(Tform3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
