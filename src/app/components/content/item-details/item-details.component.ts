import { Component } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpointService/endpoint.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'web-item-details',
  template: `
    <div class="loader-con" *ngIf="!loaded">
      <div class="loader">Loading...</div>
    </div>
    <div class="main-module-container" *ngIf="loaded">
      <div class="main-con">
        <div class="description-con">
          <div class="desc-con">
            <div class="char-desc-con">
              <div class="desc-data-con" *ngFor="let desc of descpitionObject">
                <p clas="desc-title" *ngIf="!checkIfIsAnArray(desc.value, desc.key)">
                  {{ desc.key }} : {{ desc.value }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="con-tiles">
          <div class="films-con" *ngFor="let link of editedLinks">
            <div class="extra-tab-links">
              <p>{{ link.key }}</p>
              <a class="link" *ngFor="let value of link.value" [routerLink]="['../../' + value]"
                >Link: ({{ extractDigits(value) }})</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./item-details.component.css'],
})
export class ItemDetailsComponent {
  constructor(private endpointService: EndpointService, private router: Router) {
    this.subscribeNavigationEnd();
  }
  loaded = false;
  linksAvaiable = false;
  routes: any[] = [];
  editedLinks: any[] = [];
  descpitionObject: any[] = [];
  routeParamsAvaiable = false;
  category?: string;
  id?: number;

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
      this.category = result[result.length - 2];
      this.id = parseInt(result[result.length - 1]);
      this.getItemDetails(this.category, this.id);
    }
  }

  getItemDetails(category: string, id: number) {
    this.endpointService.getItemDetails(category, id).subscribe(details => {
      this.createDescription(details);
      this.linksAvaiable = true;
      this.getLinksContent(this.descpitionObject);
      this.loaded = true;
    });
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

  getLinksContent(notEditedArrayWithLinks: any[]) {
    notEditedArrayWithLinks = notEditedArrayWithLinks.map(data => {
      if (Array.isArray(data.value)) {
        let key = data.key;
        let value = data.value;
        const routes = value.map((obj: { toString: () => string }) => {
          const result: string[] = obj.toString().split('/');
          return result[result.length - 3] + '/' + result[result.length - 2];
        });
        this.editedLinks.push({ key, value: routes });
        return data;
      }
    });
  }
}
