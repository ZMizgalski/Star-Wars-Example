import { Component, OnInit, AfterViewInit, ChangeDetectorRef, DoCheck } from '@angular/core';
import { LoaderService } from 'src/app/servieces/interceptors/loader-http-interceptor/loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'web-loader',
  template: `
    <div class="loader" *ngIf="isLoading | async">
      <div class="loader__loader"></div>
    </div>
  `,
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(private loaderService: LoaderService) {}
}
