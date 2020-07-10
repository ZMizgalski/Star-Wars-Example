import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from 'src/app/servieces/loader.service';

@Component({
  selector: 'web-loader',
  template: `
    <div class="loader-container" *ngIf="isLoading | async">
      <div class="loader-container__loader"></div>
    </div>
  `,
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(private loaderService: LoaderService) {}
}
