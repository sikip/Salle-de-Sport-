import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CautchtachComponent } from './cautchtach.component';

describe('CautchtachComponent', () => {
  let component: CautchtachComponent;
  let fixture: ComponentFixture<CautchtachComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CautchtachComponent]
    });
    fixture = TestBed.createComponent(CautchtachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
