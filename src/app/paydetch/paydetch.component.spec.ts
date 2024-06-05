import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaydetchComponent } from './paydetch.component';

describe('PaydetchComponent', () => {
  let component: PaydetchComponent;
  let fixture: ComponentFixture<PaydetchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaydetchComponent]
    });
    fixture = TestBed.createComponent(PaydetchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
