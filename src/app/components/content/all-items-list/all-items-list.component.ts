import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpointService/endpoint.service';

@Component({
  selector: 'app-all-items-list',
  template: ` <div class="loader-con" *ngIf="!loaded">
      <div class="loader">Loading...</div>
    </div>

    <div class="main-module-container" *ngIf="loaded">
      <div class="container-router">
        <div *ngFor="let category of categories" style="margin: 10px;">
          <div>
            <div class="main-con">
              <div class="char-img">
                <p style="align-self: center; color: white;">{{ category }}</p>
              </div>
            </div>
            <div class="name-title">
              <a
                style="text-decoration: none; color: white; height: 30px;"
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
