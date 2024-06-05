import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CautchevenmentComponent } from './cautchevenment.component';

describe('CautchevenmentComponent', () => {
  let component: CautchevenmentComponent;
  let fixture: ComponentFixture<CautchevenmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CautchevenmentComponent]
    });
    fixture = TestBed.createComponent(CautchevenmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
