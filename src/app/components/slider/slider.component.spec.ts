import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SliderComponent } from './slider.component';
import {
  NO_ERRORS_SCHEMA,
  asNativeElements,
  Inject,
  forwardRef,
  ReflectiveInjector,
  DebugElement,
} from '@angular/core';
import { element, By } from 'protractor';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SliderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
