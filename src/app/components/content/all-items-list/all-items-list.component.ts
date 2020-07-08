import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpointService/endpoint.service';

@Component({
  selector: 'web-all-items-list',
  template: ` <web-slider [(ngModel)]="sliderValue"></web-slider>
    <div class="all-items-list" *ngIf="loaded">
      <div *ngFor="let category of categories" class="all-items-list-container">
        <div [style.transform]="'scale(' + sliderValue * 0.01 + ')'">
          <div class="all-items-list-container-border">
            <div class="all-items-list-container-border-inner">
              <p class="all-items-list-container-border-inner-title">
                {{ category }}
              </p>
            </div>
          </div>
          <div class="all-items-list-container-bottomContainer">
            <a
              class="all-items-list-container-bottomContainer-title"
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
  sliderValue: number = 100;
  loaded = false;
  objectCategorie: Object = {};
  categories: string[] = [];
  constructor(private end: EndpointService) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.end.getAllcategories().subscribe((categoriesFromApi: Object) => {
      this.objectCategorie = categoriesFromApi;
      this.categories = Object.keys(this.objectCategorie);
      this.loaded = true;
      return this.categories;
    });
  }
}
