import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymeeComponent } from './paymee.component';

describe('PaymeeComponent', () => {
  let component: PaymeeComponent;
  let fixture: ComponentFixture<PaymeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymeeComponent]
    });
    fixture = TestBed.createComponent(PaymeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
