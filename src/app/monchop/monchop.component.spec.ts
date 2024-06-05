import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonchopComponent } from './monchop.component';

describe('MonchopComponent', () => {
  let component: MonchopComponent;
  let fixture: ComponentFixture<MonchopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonchopComponent]
    });
    fixture = TestBed.createComponent(MonchopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
