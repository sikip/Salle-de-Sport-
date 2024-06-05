import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuntactusComponent } from './cuntactus.component';

describe('CuntactusComponent', () => {
  let component: CuntactusComponent;
  let fixture: ComponentFixture<CuntactusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuntactusComponent]
    });
    fixture = TestBed.createComponent(CuntactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
