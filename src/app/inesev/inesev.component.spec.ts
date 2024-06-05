import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InesevComponent } from './inesev.component';

describe('InesevComponent', () => {
  let component: InesevComponent;
  let fixture: ComponentFixture<InesevComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InesevComponent]
    });
    fixture = TestBed.createComponent(InesevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
