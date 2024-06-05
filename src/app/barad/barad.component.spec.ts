import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaradComponent } from './barad.component';

describe('BaradComponent', () => {
  let component: BaradComponent;
  let fixture: ComponentFixture<BaradComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaradComponent]
    });
    fixture = TestBed.createComponent(BaradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
