import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';
import { BreadCrumb } from 'src/app/servieces/class/breadCrumb/bread-crumb';

@Component({
  selector: 'web-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.bredCrumbsFinalArray = this.buildBreadCrumb(this.activatedRoute.root);
  }
  value?: number;
  newBreadCrumbsArray!: BreadCrumb[];
  public bredCrumbsFinalArray!: BreadCrumb[];
  nextUrl?: string;

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.bredCrumbsFinalArray = this.buildBreadCrumb(this.activatedRoute.root);
      });
  }

  buildBreadCrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadCrumb[] = []
  ): BreadCrumb[] {
    let label: any =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
    let path: any = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    if (path?.startsWith(':') && !!route.snapshot) {
      const paramName = path?.split(':')[1];
      path = path?.replace(path, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }
    const nextUrl = path ? `${url}/${path}` : url;
    const breadcrumb: BreadCrumb = {
      label: label,
      url: nextUrl,
    };
    this.newBreadCrumbsArray = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, this.newBreadCrumbsArray);
    }
    return this.newBreadCrumbsArray;
  }
}
