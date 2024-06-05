import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatusComponent } from './chatus.component';

describe('ChatusComponent', () => {
  let component: ChatusComponent;
  let fixture: ComponentFixture<ChatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatusComponent]
    });
    fixture = TestBed.createComponent(ChatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
