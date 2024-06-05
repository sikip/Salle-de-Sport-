import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tform4Component } from './tform4.component';

describe('Tform4Component', () => {
  let component: Tform4Component;
  let fixture: ComponentFixture<Tform4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Tform4Component]
    });
    fixture = TestBed.createComponent(Tform4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
