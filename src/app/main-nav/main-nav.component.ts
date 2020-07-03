import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { RouteHolderService } from '../servieces/dataHolders/route-holder.service';
import { BreadCrumb } from '../servieces/class/breadCrumb/bread-crumb';
import { filter } from 'rxjs/operators';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {


  public bredCrumbs!: BreadCrumb[];
  constructor(private router: Router,private route: ActivatedRoute) {
    this.bredCrumbs = this.buildBreadCrumb(this.route.root)
   }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd),
      distinctUntilChanged(),
  ).subscribe(() => {
      this.bredCrumbs = this.buildBreadCrumb(this.route.root);
  })
  }

buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.breadcrumb : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    const lastRoutePart: any = path?.split('/').pop();
    const isDynamicRoute = lastRoutePart?.startsWith(':');
    if(isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart?.split(':')[1];
      path = path?.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
    }

    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: BreadCrumb = {
        label: label,
        url: nextUrl,
    };
    const newBreadcrumbs = breadcrumb.label ? [ ...breadcrumbs, breadcrumb ] : [ ...breadcrumbs];
    if (route.firstChild) {

        return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    // console.log(newBreadcrumbs);
    return newBreadcrumbs;
}

}
