import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpointService/endpoint.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
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
            <!-- <div class="img-char-con">
            <div class="img-char">
              <p style="color: black;"></p>
            </div>
            <p style="color: black;"></p>
          </div> -->

            <div class="char-desc-con">
              <div class="desc-data-con" *ngFor="let desc of descpitionObject">
                <p
                  style="word-break: break-word;font-family: Arial, Helvetica, sans-serif;"
                  *ngIf="!checkIfIsAnArray(desc.value, desc.key)"
                >
                  {{ desc.key }} : {{ desc.value }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="con-tiles">
          <div class="films-con" *ngFor="let link of links">
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
export class ItemDetailsComponent implements OnInit {
  constructor(private end: EndpointService, private router: Router, private route: ActivatedRoute) {
    this.subscribeNavigationEnd();
  }
  loaded = false;
  linksAvaiable = false;
  routes: any[] = [];
  links: any[] = [];
  descpitionObject: any[] = [];
  routeParamsAvaiable = false;
  category?: string;
  id?: number;
  ngOnInit(): void {}

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
      this.end.getItemDetails(this.category, this.id).subscribe(details => {
        this.createDescription(details);
        this.linksAvaiable = true;
        this.getLinks(this.descpitionObject);
        this.loaded = true;
      });
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

  getLinks(array: any[]) {
    array = array.map(data => {
      if (Array.isArray(data.value)) {
        let key = data.key;
        let value = data.value;
        const routes = value.map((obj: { toString: () => string }) => {
          const result: string[] = obj.toString().split('/');
          return result[result.length - 3] + '/' + result[result.length - 2];
        });
        this.links.push({ key, value: routes });
        return data;
      }
    });
  }
}
