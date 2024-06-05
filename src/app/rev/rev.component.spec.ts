import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevComponent } from './rev.component';

describe('RevComponent', () => {
  let component: RevComponent;
  let fixture: ComponentFixture<RevComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevComponent]
    });
    fixture = TestBed.createComponent(RevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
