import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnetelestComponent } from './enetelest.component';

describe('EnetelestComponent', () => {
  let component: EnetelestComponent;
  let fixture: ComponentFixture<EnetelestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnetelestComponent]
    });
    fixture = TestBed.createComponent(EnetelestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
