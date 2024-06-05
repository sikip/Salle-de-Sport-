import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreidComponent } from './offreid.component';

describe('OffreidComponent', () => {
  let component: OffreidComponent;
  let fixture: ComponentFixture<OffreidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffreidComponent]
    });
    fixture = TestBed.createComponent(OffreidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
