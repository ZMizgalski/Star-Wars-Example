import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { LoaderService } from 'src/app/servieces/interceptors/loader-http-interceptor/loader.service';

@Component({
  selector: 'web-all-items-list',
  template: ` <web-slider ngDefaultControl [(ngModel)]="sliderValue"></web-slider>
    <div class="main" *ngIf="loaded">
      <div *ngFor="let category of categories" class="main-top-container">
        <div [style.transform]="'scale(' + sliderValue * 0.01 + ')'">
          <div class="top-container-border">
            <div class="border-container-inner-box">
              <p class="border-container-inner-box__title">
                {{ category }}
              </p>
            </div>
          </div>
          <div class="main-bottom-container">
            <a class="main-bottom-container__title" [routerLink]="['/', category]">{{
              category
            }}</a>
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
