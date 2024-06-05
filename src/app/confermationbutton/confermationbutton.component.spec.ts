import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfermationbuttonComponent } from './confermationbutton.component';

describe('ConfermationbuttonComponent', () => {
  let component: ConfermationbuttonComponent;
  let fixture: ComponentFixture<ConfermationbuttonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfermationbuttonComponent]
    });
    fixture = TestBed.createComponent(ConfermationbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
