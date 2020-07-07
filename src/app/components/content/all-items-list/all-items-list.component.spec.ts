import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllItemsListComponent } from './all-items-list.component';

describe('AllItemsListComponent', () => {
  let component: AllItemsListComponent;
  let fixture: ComponentFixture<AllItemsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllItemsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
