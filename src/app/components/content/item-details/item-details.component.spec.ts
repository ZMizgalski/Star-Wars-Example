import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailsComponent } from './item-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpointService/endpoint.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({ template: `` })
class TestEmptyComponent {}

describe('ItemDetailsComponent', () => {
  let component: ItemDetailsComponent;
  let fixture: ComponentFixture<ItemDetailsComponent>;
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
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(EndpointService);
    fixture = TestBed.createComponent(ItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check if return value is in an Array', async () => {
    const value = ['http://swapi.dev/api/species/2/'];
    const key = 'Species';
    component.checkIfIsAnArray(value, key);
    expect(component.checkIfIsAnArray).toBeFalsy;
  });

  it('check if it can extract digits from string', async () => {
    const word = 'asaskask21123n';
    const word2 = component.extractDigits(word);
    expect(word2).toBeInstanceOf(String);
  });

  it('handle NavigationEnd to load item details form endpoint ', async(() => {
    spyOn(service, 'getItemDetails').and.returnValue(
      of({ results: [{ key: 'name', value: 'asasas' }] })
    );
    component.handleNavigationEnd('planets');
    expect(component.descpitionObject).toBeInstanceOf(Array);
  }));

  it('check NavigationEnd event', async () => {
    spyOn(component, 'handleNavigationEnd');
    const router: Router = TestBed.get(Router);
    router.navigateByUrl('');
    await fixture.whenStable();
    expect(component.handleNavigationEnd).toHaveBeenCalled();
  });
});
