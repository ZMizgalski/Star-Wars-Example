import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesDataComponent } from './species-data.component';

describe('SpeciesDataComponent', () => {
  let component: SpeciesDataComponent;
  let fixture: ComponentFixture<SpeciesDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeciesDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeciesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
