import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarmenuComponent } from './barmenu.component';

describe('BarmenuComponent', () => {
  let component: BarmenuComponent;
  let fixture: ComponentFixture<BarmenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarmenuComponent]
    });
    fixture = TestBed.createComponent(BarmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
