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
              class="item-details-left-container-item__title"
              *ngIf="!checkIfIsAnArray(desc.value, desc.key)"
            >
              {{ desc.key }} : {{ desc.value }}
            </p>
          </div>
        </div>

        <div class="item-details-right-container">
          <div class="item-details-right-container-item" *ngFor="let link of editedLinks">
            <p>{{ link.key }}</p>
            <a
              class="item-details-right-container-item__link"
              *ngFor="let value of link.value"
              [routerLink]="['../../' + value]"
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

  public checkIfIsAnArray(value: any, key: any): boolean {
    return Array.isArray(value) || key === 'Url' ? true : false;
  }

  public extractDigits(word: string): string {
    return word.replace(/^\D+/g, '');
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
    if (!this.routeParamsAvaiable) {
      this.routeParamsAvaiable = true;
      const result: string[] = route.split('/');
      const category = result[result.length - 2];
      const id = parseInt(result[result.length - 1], 10);
      this.getItemDetails(category, id);
    }
  }

  public createDescription(array: any[]): void {
    this.descpitionObject = Object.entries(array).map(entity => {
      const value = entity[1];
      const key = entity[0];
      const subbedString = key.charAt(0).toUpperCase() + key.slice(1);
      const editedString = subbedString.replace('_', ' ');
      return { key: editedString, value };
    });
  }

  public createRoutes(arrayOfLinksToEdit: any): void {
    this.routes = arrayOfLinksToEdit.map((obj: { toString: () => string }) => {
      const result: string[] = obj.toString().split('/');
      return result[result.length - 3] + '/' + result[result.length - 2];
    });
  }

  public getLinksContent(notEditedArrayWithLinks: any[]): void {
    notEditedArrayWithLinks = notEditedArrayWithLinks.map(data => {
      if (Array.isArray(data.value)) {
        const key = data.key;
        this.createRoutes(data.value);
        this.editedLinks.push({ key, value: this.routes });
        return data;
      }
    });
  }

  public getItemDetails(category: string, id: number): void {
    this.endpointService.getItemDetails(category, id).subscribe(details => {
      this.createDescription(details);
      this.getLinksContent(this.descpitionObject);
    });
  }
}
