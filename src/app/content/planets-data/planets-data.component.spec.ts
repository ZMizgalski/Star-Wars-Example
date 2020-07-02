import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetsDataComponent } from './planets-data.component';

describe('PlanetsDataComponent', () => {
  let component: PlanetsDataComponent;
  let fixture: ComponentFixture<PlanetsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanetsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
