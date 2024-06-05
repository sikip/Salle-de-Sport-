import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MytrainerComponent } from './mytrainer.component';

describe('MytrainerComponent', () => {
  let component: MytrainerComponent;
  let fixture: ComponentFixture<MytrainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MytrainerComponent]
    });
    fixture = TestBed.createComponent(MytrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
