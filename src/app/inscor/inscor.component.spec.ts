import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscorComponent } from './inscor.component';

describe('InscorComponent', () => {
  let component: InscorComponent;
  let fixture: ComponentFixture<InscorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscorComponent]
    });
    fixture = TestBed.createComponent(InscorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
