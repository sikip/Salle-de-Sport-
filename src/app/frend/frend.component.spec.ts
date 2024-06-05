import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrendComponent } from './frend.component';

describe('FrendComponent', () => {
  let component: FrendComponent;
  let fixture: ComponentFixture<FrendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrendComponent]
    });
    fixture = TestBed.createComponent(FrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
