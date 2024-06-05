import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdevComponent } from './updev.component';

describe('UpdevComponent', () => {
  let component: UpdevComponent;
  let fixture: ComponentFixture<UpdevComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdevComponent]
    });
    fixture = TestBed.createComponent(UpdevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
