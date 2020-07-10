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

  // tslint:disable-next-line: max-line-length
  // it('should return breadCrumb from buildBreadCrumb(route: ActivatedRoute, url: string = "",breadcrumbs: BreadCrumb[] = []) mehod', async () => {
  //   const breadCrumbObject: BreadCrumb[] = [
  //     { label: 'home', url: '' },
  //     { label: 'Species', url: '/species' },
  //     { label: '3', url: '/species/3' },
  //   ];
  //   let activatedRoute = Deceiver(ActivatedRoute);
  //   activatedRoute = {
  //     snapshot: { params: {} },
  //     firstChild: {},
  //     routeConfig: { data: { breadcrumb: 'home' }, path: ':id' },
  //   } as any;
  //   component.buildBreadCrumb(activatedRoute);
  //   spyOn(component, 'buildBreadCrumb').and.returnValue(breadCrumbObject);
  //   expect(component.bredCrumbsFinalArray).toEqual([{ label: 'as', url: 'as' }]);
  // });
});
