import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarShipsDataComponent } from './star-ships-data.component';

describe('StarShipsDataComponent', () => {
  let component: StarShipsDataComponent;
  let fixture: ComponentFixture<StarShipsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarShipsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarShipsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
