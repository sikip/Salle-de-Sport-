import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaypaymentComponent } from './maypayment.component';

describe('MaypaymentComponent', () => {
  let component: MaypaymentComponent;
  let fixture: ComponentFixture<MaypaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaypaymentComponent]
    });
    fixture = TestBed.createComponent(MaypaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
