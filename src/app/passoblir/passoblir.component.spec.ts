import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassoblirComponent } from './passoblir.component';

describe('PassoblirComponent', () => {
  let component: PassoblirComponent;
  let fixture: ComponentFixture<PassoblirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassoblirComponent]
    });
    fixture = TestBed.createComponent(PassoblirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
