import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingupcautchComponent } from './singupcautch.component';

describe('SingupcautchComponent', () => {
  let component: SingupcautchComponent;
  let fixture: ComponentFixture<SingupcautchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingupcautchComponent]
    });
    fixture = TestBed.createComponent(SingupcautchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
