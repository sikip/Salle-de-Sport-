import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatchiComponent } from './catchi.component';

describe('CatchiComponent', () => {
  let component: CatchiComponent;
  let fixture: ComponentFixture<CatchiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatchiComponent]
    });
    fixture = TestBed.createComponent(CatchiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
