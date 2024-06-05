import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Salleid2Component } from './salleid2.component';

describe('Salleid2Component', () => {
  let component: Salleid2Component;
  let fixture: ComponentFixture<Salleid2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Salleid2Component]
    });
    fixture = TestBed.createComponent(Salleid2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
