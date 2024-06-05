import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarmComponent } from './barm.component';

describe('BarmComponent', () => {
  let component: BarmComponent;
  let fixture: ComponentFixture<BarmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarmComponent]
    });
    fixture = TestBed.createComponent(BarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
