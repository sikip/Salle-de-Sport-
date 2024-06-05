import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProddectComponent } from './proddect.component';

describe('ProddectComponent', () => {
  let component: ProddectComponent;
  let fixture: ComponentFixture<ProddectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProddectComponent]
    });
    fixture = TestBed.createComponent(ProddectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
