import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewevcComponent } from './newevc.component';

describe('NewevcComponent', () => {
  let component: NewevcComponent;
  let fixture: ComponentFixture<NewevcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewevcComponent]
    });
    fixture = TestBed.createComponent(NewevcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
