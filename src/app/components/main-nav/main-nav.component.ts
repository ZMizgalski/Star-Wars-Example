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
    this.bredCrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }
  value?: number;
  newBreadCrumbs!: BreadCrumb[];
  public bredCrumbs!: BreadCrumb[];

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.bredCrumbs = this.buildBreadCrumb(this.activatedRoute.root);
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

    const isDynamicRoute = path?.startsWith(':');
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = path?.split(':')[1];
      path = path?.replace(path, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }
    const nextUrl = path ? `${url}/${path}` : url;
    const breadcrumb: BreadCrumb = {
      label: label,
      url: nextUrl,
    };
    this.newBreadCrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, this.newBreadCrumbs);
    }
    return this.newBreadCrumbs;
  }
}
