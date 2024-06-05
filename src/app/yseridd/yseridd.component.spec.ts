import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YseriddComponent } from './yseridd.component';

describe('YseriddComponent', () => {
  let component: YseriddComponent;
  let fixture: ComponentFixture<YseriddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YseriddComponent]
    });
    fixture = TestBed.createComponent(YseriddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
