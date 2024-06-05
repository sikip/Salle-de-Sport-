import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventlComponent } from './eventl.component';

describe('EventlComponent', () => {
  let component: EventlComponent;
  let fixture: ComponentFixture<EventlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventlComponent]
    });
    fixture = TestBed.createComponent(EventlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
