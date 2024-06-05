import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HhComponent } from './hh.component';

describe('HhComponent', () => {
  let component: HhComponent;
  let fixture: ComponentFixture<HhComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HhComponent]
    });
    fixture = TestBed.createComponent(HhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
