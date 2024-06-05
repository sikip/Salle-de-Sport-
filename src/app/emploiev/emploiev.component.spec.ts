import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploievComponent } from './emploiev.component';

describe('EmploievComponent', () => {
  let component: EmploievComponent;
  let fixture: ComponentFixture<EmploievComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmploievComponent]
    });
    fixture = TestBed.createComponent(EmploievComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
