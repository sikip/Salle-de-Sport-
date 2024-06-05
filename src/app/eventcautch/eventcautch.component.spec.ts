import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventcautchComponent } from './eventcautch.component';

describe('EventcautchComponent', () => {
  let component: EventcautchComponent;
  let fixture: ComponentFixture<EventcautchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventcautchComponent]
    });
    fixture = TestBed.createComponent(EventcautchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
