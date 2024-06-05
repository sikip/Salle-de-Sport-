import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IventidComponent } from './iventid.component';

describe('IventidComponent', () => {
  let component: IventidComponent;
  let fixture: ComponentFixture<IventidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IventidComponent]
    });
    fixture = TestBed.createComponent(IventidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
