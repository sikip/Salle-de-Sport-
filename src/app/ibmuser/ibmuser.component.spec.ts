import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IbmuserComponent } from './ibmuser.component';

describe('IbmuserComponent', () => {
  let component: IbmuserComponent;
  let fixture: ComponentFixture<IbmuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IbmuserComponent]
    });
    fixture = TestBed.createComponent(IbmuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
