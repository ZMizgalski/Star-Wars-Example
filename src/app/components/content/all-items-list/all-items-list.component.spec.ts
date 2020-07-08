import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllItemsListComponent } from './all-items-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EndpointService } from 'src/app/servieces/endpointService/endpoint.service';
import { of } from 'rxjs';

describe('AllItemsListComponent', () => {
  let component: AllItemsListComponent;
  let fixture: ComponentFixture<AllItemsListComponent>;
  let service: EndpointService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AllItemsListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(EndpointService);
    fixture = TestBed.createComponent(AllItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handle NavigationEnd to load categories form endpoint ', async(() => {
    spyOn(service, 'getAllcategories').and.returnValue(of(['asas', 'asas']));
    component.setAllCategories();
    expect(component.categories).toBeInstanceOf(Array);
  }));
});
