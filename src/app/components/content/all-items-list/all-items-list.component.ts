import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpointService/endpoint.service';
import { LoaderService } from 'src/app/servieces/interceptors/loader-http-interceptor/loader.service';

@Component({
  selector: 'web-all-items-list',
  template: ` <web-slider ngDefaultControl [(ngModel)]="sliderValue"></web-slider>
    <div class="all-items-list" *ngIf="loaded">
      <div *ngFor="let category of categories" class="all-items-list-container">
        <div [style.transform]="'scale(' + sliderValue * 0.01 + ')'">
          <div class="all-items-list-container-border">
            <div class="all-items-list-container-border-inner-box">
              <p class="all-items-list-container-border-inner-box__title">
                {{ category }}
              </p>
            </div>
          </div>
          <div class="all-items-list-container-bottom-container">
            <a
              class="all-items-list-container-bottom-container__title"
              [routerLink]="['/', category]"
              >{{ category }}</a
            >
          </div>
        </div>
      </div>
    </div>`,
  styleUrls: ['./all-items-list.component.css'],
})
export class AllItemsListComponent implements OnInit {
  sliderValue = 100;
  loaded = this.loaderService.isLoading;
  categories: string[] = [];
  constructor(private endpointService: EndpointService, private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.setAllCategories();
  }

  public setAllCategories(): void {
    this.endpointService.getAllcategories().subscribe(categoriesFromApi => {
      return (this.categories = Object.keys(categoriesFromApi));
    });
  }
}
