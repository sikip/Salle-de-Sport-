import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewevComponent } from './newev.component';

describe('NewevComponent', () => {
  let component: NewevComponent;
  let fixture: ComponentFixture<NewevComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewevComponent]
    });
    fixture = TestBed.createComponent(NewevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
