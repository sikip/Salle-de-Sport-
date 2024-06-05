import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChopuserComponent } from './chopuser.component';

describe('ChopuserComponent', () => {
  let component: ChopuserComponent;
  let fixture: ComponentFixture<ChopuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChopuserComponent]
    });
    fixture = TestBed.createComponent(ChopuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
