import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidrevComponent } from './slidrev.component';

describe('SlidrevComponent', () => {
  let component: SlidrevComponent;
  let fixture: ComponentFixture<SlidrevComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlidrevComponent]
    });
    fixture = TestBed.createComponent(SlidrevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
