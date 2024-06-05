import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserclientComponent } from './userclient.component';

describe('UserclientComponent', () => {
  let component: UserclientComponent;
  let fixture: ComponentFixture<UserclientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserclientComponent]
    });
    fixture = TestBed.createComponent(UserclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
