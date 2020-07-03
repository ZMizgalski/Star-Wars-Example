import { Component, OnInit, DoCheck, Output } from '@angular/core';
import { RouteHolderService } from 'src/app/servieces/dataHolders/route-holder.service';
import { EventEmitter } from '@angular/core'

@Component({
  selector: 'app-slider',
  template: `
  <div style="display: flex;
    align-items: center;
    justify-content: center;">
  <h3 style="color: white;margin-right: 20px">{{val1}}</h3>
  <p-slider [(ngModel)]="val1" (onChange)="handleChange($event)" [max]="max" [style]="{'width':'14em' }"></p-slider>
</div>

  `,
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit{

val1?: number = 0;
max?: number = 100;

@Output() valEvent = new EventEmitter();

  constructor(private holder: RouteHolderService) {
   }
  ngOnInit(): void {
  }

  handleChange(event: any) {
    this.holder.changeVal(event.value)
  }


}
