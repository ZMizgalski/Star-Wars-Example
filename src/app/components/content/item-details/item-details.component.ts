import { Component } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpointService/endpoint.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { LoaderService } from 'src/app/servieces/interceptors/loader-http-interceptor/loader.service';

@Component({
  selector: 'web-item-details',
  template: `
    <div class="item-details" *ngIf="loaded">
      <div class="item-details-container">
        <div class="item-details-left-container">
          <div class="item-details-left-container-item" *ngFor="let desc of descpitionObject">
            <p
              class="item-details-left-container-item-title"
              *ngIf="!checkIfIsAnArray(desc.value, desc.key)"
            >
              {{ desc.key }} : {{ desc.value }}
            </p>
          </div>
        </div>

        <div class="item-details-right-container">
          <div class="item-details-right-container-item" *ngFor="let link of editedLinks">
            <p>{{ link.key }}</p>
            <a class="link" *ngFor="let value of link.value" [routerLink]="['../../' + value]"
              >Link: ({{ extractDigits(value) }})</a
            >
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent {
  constructor(
    private endpointService: EndpointService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.subscribeNavigationEnd();
  }
  loaded = this.loaderService.isLoading;
  editedLinks: any[] = [];
  routes: any[] = [];
  descpitionObject: any[] = [];
  routeParamsAvaiable = false;

  checkIfIsAnArray(value: any, key: any) {
    return Array.isArray(value) || key === 'Url' ? true : false;
  }

  extractDigits(word: string) {
    return word.replace(/^\D+/g, '');
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
    if (!this.routeParamsAvaiable) {
      this.routeParamsAvaiable = true;
      const result: string[] = route.split('/');
      const category = result[result.length - 2];
      const id = parseInt(result[result.length - 1]);
      this.getItemDetails(category, id);
    }
  }

  createDescription(array: any[]) {
    this.descpitionObject = Object.entries(array).map(entity => {
      const value = entity[1];
      const key = entity[0];
      const subbedString = key.charAt(0).toUpperCase() + key.slice(1);
      let editedString = subbedString.replace('_', ' ');
      return { key: editedString, value: value };
    });
  }

  createRoutes(arrayOfLinksToEdit: any) {
    this.routes = arrayOfLinksToEdit.map((obj: { toString: () => string }) => {
      const result: string[] = obj.toString().split('/');
      return result[result.length - 3] + '/' + result[result.length - 2];
    });
  }

  getLinksContent(notEditedArrayWithLinks: any[]) {
    notEditedArrayWithLinks = notEditedArrayWithLinks.map(data => {
      if (Array.isArray(data.value)) {
        let key = data.key;
        this.createRoutes(data.value);
        this.editedLinks.push({ key, value: this.routes });
        return data;
      }
    });
  }

  getItemDetails(category: string, id: number) {
    this.endpointService.getItemDetails(category, id).subscribe(details => {
      this.createDescription(details);
      this.getLinksContent(this.descpitionObject);
    });
  }
}
