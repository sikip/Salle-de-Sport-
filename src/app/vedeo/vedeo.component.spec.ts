import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VedeoComponent } from './vedeo.component';

describe('VedeoComponent', () => {
  let component: VedeoComponent;
  let fixture: ComponentFixture<VedeoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VedeoComponent]
    });
    fixture = TestBed.createComponent(VedeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
