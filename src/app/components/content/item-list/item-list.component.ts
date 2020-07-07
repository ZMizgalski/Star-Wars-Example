import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpointService/endpoint.service';
import { ActivatedRoute, ParamMap, Router, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { Page } from 'src/app/servieces/class/page/page';

@Component({
  selector: 'web-item-list',
  template: ` <div class="loader-con" *ngIf="!loaded">
      <div class="loader">Loading...</div>
    </div>

    <div class="main-module-container" *ngIf="loaded">
      <div class="container-router">
        <div *ngFor="let item of editedArrayOfObjects" style="margin: 10px;">
          <div>
            <div class="main-con">
              <div class="char-img">
                <p
                  style="align-self: center;font-family: Arial, Helvetica, sans-serif;color: white"
                >
                  {{ item.dynamicTag }}
                </p>
              </div>
            </div>
            <div class="name-title">
              <a
                style="text-decoration: none; color: white; height: 30px;font-family: Arial, Helvetica, sans-serif;"
                [routerLink]="item.id"
                >{{ item.dynamicTag }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>`,
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  constructor(private end: EndpointService, private router: Router, private route: ActivatedRoute) {
    this.subscribeNavigationEnd();
  }
  loaded = false;
  routeParamsAvaiable = false;
  keysOfItem: string[] = [];
  pageContent!: Page;
  notEditedArrayOfObjects: any[] = [];
  editedArrayOfObjects: any[] = [];
  ngOnInit(): void {}

  subscribeNavigationEnd() {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(e => {
        this.handleNavigationEnd(e.url.replace('/', ''));
      });
  }
  handleNavigationEnd(route: any) {
    if (!this.routeParamsAvaiable) {
      this.routeParamsAvaiable = true;
      if (route != '') {
        this.end.getItemsByCategory(route).subscribe(peopleFromApi => {
          this.pageContent = peopleFromApi;
          this.notEditedArrayOfObjects = this.pageContent.results;
          this.editedArrayOfObjects = this.notEditedArrayOfObjects.map(object => {
            object.customName = Object.keys(object)[0];
            object.dynamicTag = object[object.customName];
            const result: string[] = object.url.split('/');
            object.id = result[result.length - 2] + '/';
            return object;
          });
          this.loaded = true;
        });
      }
    }
  }
}