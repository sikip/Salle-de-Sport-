import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventnotComponent } from './eventnot.component';

describe('EventnotComponent', () => {
  let component: EventnotComponent;
  let fixture: ComponentFixture<EventnotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventnotComponent]
    });
    fixture = TestBed.createComponent(EventnotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
