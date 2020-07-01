import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDataSpecComponent } from './character-data-spec.component';

describe('CharacterDataSpecComponent', () => {
  let component: CharacterDataSpecComponent;
  let fixture: ComponentFixture<CharacterDataSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterDataSpecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDataSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
