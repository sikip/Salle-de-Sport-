import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserinfComponent } from './userinf.component';

describe('UserinfComponent', () => {
  let component: UserinfComponent;
  let fixture: ComponentFixture<UserinfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserinfComponent]
    });
    fixture = TestBed.createComponent(UserinfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
