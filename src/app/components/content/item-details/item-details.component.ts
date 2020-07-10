import { Component } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged, take, first } from 'rxjs/operators';
import { LoaderService } from 'src/app/servieces/loader.service';
import { EditedLinks } from 'src/app/interfaces/edited-links';
import { Description } from 'src/app/interfaces/description';
@Component({
  selector: 'web-item-details',
  template: `
    <div class="main">
      <div class="main-container" *ngIf="loaded">
        <div class="left-container">
          <div class="left-container-item" *ngFor="let desc of arrayOfDescriptonData">
            <p class="left-container-item__title" *ngIf="!checkIfIsAnArray(desc.value, desc.key)">
              {{ desc.key }} : {{ desc.value }}
            </p>
          </div>
        </div>

        <div class="right-container">
          <div class="right-container-item" *ngFor="let link of editedLinksArray">
            <p>{{ link.key }}</p>
            <a
              class="right-container-item__link"
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
  editedLinksArray: EditedLinks[] = [];
  routesArray: string[] = [];
  arrayOfDescriptonData: Description[] = [];

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
    const result: string[] = route.split('/');
    const category = result[result.length - 2];
    const id = parseInt(result[result.length - 1], 10);
    this.getItemDetails(category, id);
  }

  private createDescription(array: any[]): void {
    this.arrayOfDescriptonData = Object.entries(array).map(entity => {
      const value = entity[1];
      const key = entity[0];
      const subbedString = key.charAt(0).toUpperCase() + key.slice(1);
      const editedString = subbedString.replace('_', ' ');
      return { key: editedString, value };
    });
  }

  private createRoutes(arrayOfLinksToEdit: any): void {
    this.routesArray = arrayOfLinksToEdit.map((obj: { toString: () => string }) => {
      const result: string[] = obj.toString().split('/');
      return result[result.length - 3] + '/' + result[result.length - 2];
    });
  }

  private getLinksContent(notEditedArrayWithLinks: any[]): void {
    notEditedArrayWithLinks = notEditedArrayWithLinks.map(data => {
      if (Array.isArray(data.value)) {
        const key = data.key;
        this.createRoutes(data.value);
        this.editedLinksArray.push({ key, value: this.routesArray });
        return data;
      }
    });
  }

  private getItemDetails(category: string, id: number): void {
    this.endpointService.getItemDetails(category, id).subscribe(details => {
      this.createDescription(details);
      this.getLinksContent(this.arrayOfDescriptonData);
    });
  }
}
