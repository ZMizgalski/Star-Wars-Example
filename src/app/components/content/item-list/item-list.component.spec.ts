import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemListComponent } from './item-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EndpointService } from 'src/app/servieces/endpointService/endpoint.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({ template: `` })
class TestEmptyComponent {}

describe('ItemListComponent', () => {
  let component: ItemListComponent;
  let fixture: ComponentFixture<ItemListComponent>;
  let service: EndpointService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: '',
            component: TestEmptyComponent,
          },
        ]),
      ],
      declarations: [ItemListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(EndpointService);
    fixture = TestBed.createComponent(ItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onWindowScroll when HostListener', async(() => {
    expect(component.onWindowScroll()).toBeUndefined;
  }));

  it('handle NavigationEnd() method to load items by categorie form endpoint getItemsByCategory(category: string) ', async(() => {
    spyOn(service, 'getItemsByCategory').and.returnValue(
      of({
        results: [
          { customName: '', dynamicTag: '', url: 'http://swapi.dev/api/species/1/', id: '' },
        ],
      })
    );
    const testArray = [
      {
        customName: 'customName',
        dynamicTag: 'customName',
        url: 'http://swapi.dev/api/species/1/',
        id: '1/',
      },
    ];
    component.handleNavigationEnd('planets');
    expect(component.editedArrayOfObjectsWithParametersForNgFor).toEqual(testArray);
  }));

  it('should load more on Scrool with endpoint getItemsByPage(category: string, page: number)', async(() => {
    spyOn(service, 'getItemsByPage').and.returnValue(
      of({
        next: 'planets/?page=2',
        results: [{ name: 'asas', url: 'asasas/asas/planets/2', id: '' }],
      })
    );
    const testArray = [
      {
        name: 'asas',
        customName: 'name',
        dynamicTag: 'asas',
        url: 'asasas/asas/planets/2',
        id: 'planets/',
      },
    ];
    component.loadMore();

    expect(component.editedArrayOfObjectsWithParametersForNgFor).toEqual(testArray);
  }));

  it('check NavigationEnd event', async () => {
    let component = TestBed.createComponent(ItemListComponent).componentInstance;
    spyOn(component, 'handleNavigationEnd');
    const router: Router = TestBed.get(Router);
    router.navigateByUrl('');
    await fixture.whenStable();
    expect(component.handleNavigationEnd).toHaveBeenCalled();
  });
});
