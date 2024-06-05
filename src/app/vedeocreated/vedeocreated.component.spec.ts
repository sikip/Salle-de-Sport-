import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VedeocreatedComponent } from './vedeocreated.component';

describe('VedeocreatedComponent', () => {
  let component: VedeocreatedComponent;
  let fixture: ComponentFixture<VedeocreatedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VedeocreatedComponent]
    });
    fixture = TestBed.createComponent(VedeocreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
