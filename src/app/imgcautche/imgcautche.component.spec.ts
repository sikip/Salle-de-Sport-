import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgcautcheComponent } from './imgcautche.component';

describe('ImgcautcheComponent', () => {
  let component: ImgcautcheComponent;
  let fixture: ComponentFixture<ImgcautcheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImgcautcheComponent]
    });
    fixture = TestBed.createComponent(ImgcautcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
