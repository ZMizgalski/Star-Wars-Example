import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsDataComponent } from './films-data.component';

describe('FilmsDataComponent', () => {
  let component: FilmsDataComponent;
  let fixture: ComponentFixture<FilmsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
