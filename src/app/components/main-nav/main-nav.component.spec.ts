import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MainNavComponent } from './main-nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { Deceiver } from 'deceiver-core';
import { BreadCrumb } from 'src/app/servieces/class/breadCrumb/bread-crumb';

describe('MainNavComponent', () => {
  let component: MainNavComponent;
  let fixture: ComponentFixture<MainNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [MainNavComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check NavigationEnd event', async () => {
    spyOn(component, 'buildBreadCrumb');
    const router: Router = TestBed.get(Router);
    router.navigateByUrl('');
    await fixture.whenStable();
    expect(component.buildBreadCrumb).toHaveBeenCalled();
  });

  it('check if can split routeParam', async () => {
    let activatedRoute = Deceiver(ActivatedRoute);
    activatedRoute = <any>{
      snapshot: { params: {} },
      routeConfig: { data: { breadcrumb: 'home' }, path: ':id' },
    };
    component.buildBreadCrumb(activatedRoute);
    expect(component.newBreadCrumbs).toBeInstanceOf(Array);
  });

  it('should return breadCrumb', async () => {
    let breadCrumbObject: BreadCrumb[] = [
      { label: 'home', url: '' },
      { label: 'Characters', url: '/people' },
      { label: '1', url: '/people/1' },
    ];
    let activatedRoute = Deceiver(ActivatedRoute);
    activatedRoute = <any>{
      snapshot: { params: {} },
      firstChild: {},
      routeConfig: { data: { breadcrumb: 'home' }, path: ':id' },
    };
    component.buildBreadCrumb(activatedRoute);
    spyOn(component, 'buildBreadCrumb').and.returnValue(breadCrumbObject);
    expect(component.newBreadCrumbs).toBeInstanceOf(Array);
  });
});
