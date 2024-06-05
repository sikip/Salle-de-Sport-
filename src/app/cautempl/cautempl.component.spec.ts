import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CautemplComponent } from './cautempl.component';

describe('CautemplComponent', () => {
  let component: CautemplComponent;
  let fixture: ComponentFixture<CautemplComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CautemplComponent]
    });
    fixture = TestBed.createComponent(CautemplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
