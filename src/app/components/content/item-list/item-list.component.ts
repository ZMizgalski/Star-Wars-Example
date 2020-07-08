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
          *ngFor="let item of editedArrayOfObjectsWithParametersForNgFor"
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
  arrayOfObjectsWithoutDataToDisplay: any[] = [];
  editedArrayOfObjectsWithParametersForNgFor: any[] = [];
  i = 1;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isBottomReached()) this.loadMore();
  }

  isBottomReached() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight;
  }

  loadMore() {
    this.endpointService.getItemsByPage(this.routePageCategory, this.i).subscribe(data => {
      if (data.next) {
        const path: string[] = data.next.split('=');
        this.i = parseInt(path[path.length - 1]);
        this.arrayOfObjectsWithoutDataToDisplay = this.arrayOfObjectsWithoutDataToDisplay.concat(
          data.results
        );
        this.editDataToDisplayInNgFor(this.arrayOfObjectsWithoutDataToDisplay);
      }
    });
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
        this.getItemsByCategory(route);
      }
    }
  }

  getItemsByCategory(route: any) {
    this.endpointService.getItemsByCategory(route).subscribe(peopleFromApi => {
      this.pageContent = peopleFromApi;
      this.arrayOfObjectsWithoutDataToDisplay = this.pageContent.results;
      this.editDataToDisplayInNgFor(this.arrayOfObjectsWithoutDataToDisplay);
      this.loaded = true;
    });
  }

  editDataToDisplayInNgFor(notEditedArray: any[]) {
    this.editedArrayOfObjectsWithParametersForNgFor = notEditedArray.map(object => {
      object.customName = Object.keys(object)[0];
      object.dynamicTag = object[object.customName];
      const result: string[] = object.url.split('/');
      object.id = result[result.length - 2] + '/';
      return object;
    });
  }
}
