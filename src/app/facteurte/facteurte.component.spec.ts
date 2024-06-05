import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacteurteComponent } from './facteurte.component';

describe('FacteurteComponent', () => {
  let component: FacteurteComponent;
  let fixture: ComponentFixture<FacteurteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacteurteComponent]
    });
    fixture = TestBed.createComponent(FacteurteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
