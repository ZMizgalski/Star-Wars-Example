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

  it('handle NavigationEnd to load categories form endpoint ', async(() => {
    spyOn(service, 'getItemsByCategory').and.returnValue(
      of({ results: [{ customName: '', dynamicTag: '', url: 'asasas/asas/asas/as', id: '' }] })
    );
    component.handleNavigationEnd('planets');
    expect(component.editedArrayOfObjects).toBeInstanceOf(Array);
  }));

  it('load more on Scrool', async(() => {
    spyOn(service, 'getItemsByPage').and.returnValue(
      of({ next: 'sdssd=asas', results: [{ name: 'asas', url: 'asasas/asas/asas/as', id: '' }] })
    );

    component.loadMore();

    expect(component.editedArrayOfObjects).toBeInstanceOf(Array);
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
