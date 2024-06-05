import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvcaoutchComponent } from './evcaoutch.component';

describe('EvcaoutchComponent', () => {
  let component: EvcaoutchComponent;
  let fixture: ComponentFixture<EvcaoutchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EvcaoutchComponent]
    });
    fixture = TestBed.createComponent(EvcaoutchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
