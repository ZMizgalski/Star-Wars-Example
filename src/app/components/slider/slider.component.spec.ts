import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderComponent } from './slider.component';
import { DebugElement } from '@angular/core';

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

  it('Should return values from set value', () => {
    const spy = spyOnProperty(component, 'sliderValue', 'set');
    component.sliderValue = 1;
    expect(spy).toHaveBeenCalled();
  });
});
