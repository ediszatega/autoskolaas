import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasesSectionComponent } from './phases-section.component';

describe('PhasesSectionComponent', () => {
  let component: PhasesSectionComponent;
  let fixture: ComponentFixture<PhasesSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhasesSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhasesSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
