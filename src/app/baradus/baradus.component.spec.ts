import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaradusComponent } from './baradus.component';

describe('BaradusComponent', () => {
  let component: BaradusComponent;
  let fixture: ComponentFixture<BaradusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaradusComponent]
    });
    fixture = TestBed.createComponent(BaradusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
