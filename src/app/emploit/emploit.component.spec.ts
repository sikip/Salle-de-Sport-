import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploitComponent } from './emploit.component';

describe('EmploitComponent', () => {
  let component: EmploitComponent;
  let fixture: ComponentFixture<EmploitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmploitComponent]
    });
    fixture = TestBed.createComponent(EmploitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
