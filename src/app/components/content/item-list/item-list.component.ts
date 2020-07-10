import { Component, HostListener } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { LoaderService } from 'src/app/servieces/loader.service';
import { Page } from 'src/app/interfaces/page';
@Component({
  selector: 'web-item-list',
  template: ` <web-slider ngDefaultControl [(ngModel)]="sliderValue"></web-slider>
    <div class="main" *ngIf="loaded">
      <div class="main-container">
        <div
          class="main-container-item"
          *ngFor="let item of editedArrayOfObjectsWithParametersForNgFor"
          [style.transform]="'scale(' + sliderValue * 0.01 + ')'"
        >
          <div class="item-container-upper-square">
            <div class="upper-square-inner-square">
              <p class="upper-square-inner-square__title">
                {{ item.dynamicTag }}
              </p>
            </div>
          </div>
          <div class="item-container-bottom-square">
            <a class="bottom-square__title" [routerLink]="item.id">{{ item.dynamicTag }}</a>
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
    private loaderService: LoaderService
  ) {
    this.subscribeNavigationEnd();
  }

  sliderValue = 100;
  routePageCategory = '';
  loaded = this.loaderService.isLoading;
  routeParamsAreAvaiable = false;
  keysOfItem: string[] = [];
  pageContent!: Page;
  arrayOfObjectsWithoutDataToDisplay: any[] = [];
  editedArrayOfObjectsWithParametersForNgFor: any[] = [];
  pageIndex = 1;

  @HostListener('window:scroll', [])
  public onWindowScroll(): void {
    if (this.isBottomReached()) {
      this.loadMore();
    }
  }

  public isBottomReached(): boolean {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight;
  }

  public loadMore(): void {
    this.endpointService.getItemsByPage(this.routePageCategory, this.pageIndex).subscribe(data => {
      this.pageContent = data;
      if (this.pageContent.next) {
        const path: string[] = this.pageContent.next.split('=');
        this.pageIndex = parseInt(path[path.length - 1], 10);
        this.arrayOfObjectsWithoutDataToDisplay = this.arrayOfObjectsWithoutDataToDisplay.concat(
          this.pageContent.results
        );
        this.editDataToDisplayInNgFor(this.arrayOfObjectsWithoutDataToDisplay);
      }
    });
  }

  public subscribeNavigationEnd(): void {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(e => {
        this.handleNavigationEnd(e.url.replace('/', ''));
      });
  }

  public handleNavigationEnd(route: any): void {
    if (!this.routeParamsAreAvaiable) {
      this.routeParamsAreAvaiable = true;

      if (route !== '') {
        this.routePageCategory = route;
        this.getItemsByCategory(route);
      }
    }
  }

  public editDataToDisplayInNgFor(notEditedArray: any[]): void {
    this.editedArrayOfObjectsWithParametersForNgFor = notEditedArray.map(object => {
      object.customName = Object.keys(object)[0];
      object.dynamicTag = object[object.customName];
      const result: string[] = object.url.split('/');
      object.id = result[result.length - 2] + '/';
      return object;
    });
  }

  public getItemsByCategory(route: any): void {
    this.endpointService.getItemsByCategory(route).subscribe(peopleFromApi => {
      this.pageContent = peopleFromApi;
      this.arrayOfObjectsWithoutDataToDisplay = this.pageContent.results;
      this.editDataToDisplayInNgFor(this.arrayOfObjectsWithoutDataToDisplay);
    });
  }
}
