import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SallidComponent } from './sallid.component';

describe('SallidComponent', () => {
  let component: SallidComponent;
  let fixture: ComponentFixture<SallidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SallidComponent]
    });
    fixture = TestBed.createComponent(SallidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
