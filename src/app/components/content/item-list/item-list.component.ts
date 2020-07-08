import { Component, HostListener } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpointService/endpoint.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { Page } from 'src/app/servieces/class/page/page';

@Component({
  selector: 'web-item-list',
  template: ` <web-loader *ngIf="!loaded"></web-loader>
    <web-slider [(ngModel)]="sliderValue"></web-slider>
    <div class="main-module-container" *ngIf="loaded">
      <div class="container-router">
        <div
          class="item-con"
          *ngFor="let item of editedArrayOfObjects"
          [style.transform]="'scale(' + sliderValue * 0.01 + ')'"
        >
          <div>
            <div class="main-con">
              <div class="char-img">
                <p class="img-title">
                  {{ item.dynamicTag }}
                </p>
              </div>
            </div>
            <div class="name-title">
              <a class="name-title-p" [routerLink]="item.id">{{ item.dynamicTag }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>`,
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent {
  constructor(
    private endpointService: EndpointService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.subscribeNavigationEnd();
  }
  sliderValue: number = 100;
  routePageCategory: string = '';
  loaded = false;
  routeParamsAreAvaiable = false;
  keysOfItem: string[] = [];
  pageContent!: Page;
  notEditedArrayOfObjects: any[] = [];
  editedArrayOfObjects: any[] = [];
  i = 1;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isBottomReached()) this.loadMore();
  }

  loadMore() {
    this.endpointService.getItemsByPage(this.routePageCategory, this.i).subscribe(data => {
      if (data.next) {
        const path: string[] = data.next.split('=');
        this.i = parseInt(path[path.length - 1]);
        this.notEditedArrayOfObjects = this.notEditedArrayOfObjects.concat(data.results);
        this.editedArrayOfObjects = this.notEditedArrayOfObjects.map(object => {
          object.customName = Object.keys(object)[0];
          object.dynamicTag = object[object.customName];
          const result: string[] = object.url.split('/');
          object.id = result[result.length - 2] + '/';
          return object;
        });
      }
    });
  }

  isBottomReached() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight;
  }

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
    if (!this.routeParamsAreAvaiable) {
      this.routeParamsAreAvaiable = true;

      if (route != '') {
        this.routePageCategory = route;
        this.endpointService.getItemsByCategory(route).subscribe(peopleFromApi => {
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
