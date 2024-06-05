import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IventComponent } from './ivent.component';

describe('IventComponent', () => {
  let component: IventComponent;
  let fixture: ComponentFixture<IventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IventComponent]
    });
    fixture = TestBed.createComponent(IventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
