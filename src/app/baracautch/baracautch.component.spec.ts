import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaracautchComponent } from './baracautch.component';

describe('BaracautchComponent', () => {
  let component: BaracautchComponent;
  let fixture: ComponentFixture<BaracautchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaracautchComponent]
    });
    fixture = TestBed.createComponent(BaracautchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
