import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'web-slider',
  template: `<div class="slider">
    <h3 class="slider-left-valueIndicator">{{ rawSliderValue }}</h3>
    <p-slider
      [(ngModel)]="sliderValue"
      [min]="50"
      [max]="max"
      [style]="{ width: '14em' }"
    ></p-slider>
  </div> `,
  styleUrls: ['./slider.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true,
    },
  ],
})
export class SliderComponent implements ControlValueAccessor {
  rawSliderValue?: number = 0;
  max?: number = 100;
  onChange: any = () => {};
  onTouch: any = () => {};

  set sliderValue(sliderValue: number) {
    if (sliderValue !== undefined && this.rawSliderValue !== sliderValue) {
      this.rawSliderValue = sliderValue;
      this.onChange(sliderValue);
      this.onTouch(sliderValue);
    }
  }

  writeValue(obj: any): void {
    this.sliderValue = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
