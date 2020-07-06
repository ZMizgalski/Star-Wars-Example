import { Component, OnInit, DoCheck, Output, forwardRef } from '@angular/core';
import { RouteHolderService } from 'src/app/servieces/dataHolders/route-holder.service';
import { EventEmitter } from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-slider',
  template: `
  <div style="display: flex;
    align-items: center;
    justify-content: center;">
  <h3 style="color: white;margin-right: 20px">{{val1}}</h3>
  <p-slider [(ngModel)]="value" [max]="max" [style]="{'width':'14em' }"></p-slider>
</div>

  `,
  styleUrls: ['./slider.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true,
    }
  ]
})
export class SliderComponent implements ControlValueAccessor{

val1?: number = 0;
max?: number = 100;
onChange: any = () => {};
onTouch: any = () => {};

set value(val1: number | undefined) {
  if (val1 !== undefined && this.val1 !== val1) {
    this.val1 = val1;
    this.onChange(val1);
    this.onTouch(val1);
  }
}

constructor() {}


  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
