import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddphotoComponent } from './addphoto.component';

describe('AddphotoComponent', () => {
  let component: AddphotoComponent;
  let fixture: ComponentFixture<AddphotoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddphotoComponent]
    });
    fixture = TestBed.createComponent(AddphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
