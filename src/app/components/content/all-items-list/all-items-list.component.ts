import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpointService/endpoint.service';

@Component({
  selector: 'web-all-items-list',
  template: ` <div class="loader-con" *ngIf="!loaded">
      <div class="loader">Loading...</div>
    </div>
    <web-slider [(ngModel)]="value"></web-slider>
    <div class="main-module-container" *ngIf="loaded">
      <div class="container-router">
        <div *ngFor="let category of categories" style="margin: 10px;">
          <div [style.transform]="'scale(' + value * 0.01 + ')'">
            <div class="main-con">
              <div class="char-img">
                <p
                  style="align-self: center; color: white;font-family: Arial, Helvetica, sans-serif;"
                >
                  {{ category }}
                </p>
              </div>
            </div>
            <div class="name-title">
              <a
                style="text-decoration: none; color: white; height: 30px;font-family: Arial, Helvetica, sans-serif;"
                [routerLink]="['/', category]"
                >{{ category }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>`,
  styleUrls: ['./all-items-list.component.css'],
})
export class AllItemsListComponent implements OnInit {
  value: number = 100;
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
