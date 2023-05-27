import { Component, OnInit } from "@angular/core";
import { rootAnimation } from "@umun-tech/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";

/**
 * Add this to app-routing.module
 *export const __home = 'home';
 *
 {
   path: __home,    loadChildren: () => import('./portals/home/home.module').then(m => m.HomeModule),
    canLoad: [LoggedInGuard, OrganizationSelectedGuard],
    canActivate: [OrganizationSelectedGuard]
  },
 */


@Component({
  selector: "umn-home",
  templateUrl: "home.portal.html",
  styleUrls: ["home.portal.scss"],
  animations: [
    rootAnimation
  ]
})
export class HomePortal implements OnInit {
  page1: string = "/portal-35/pageOne";
  page2= "/portal-35/pageTwo";

  //very long array of lrem ipsum
  longArray = Array.from({length: 20}, (_, i) => i);

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.router?.config[0].path)
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log('Navigated from URL: ', event.urlAfterRedirects);
        console.log('Navigated to URL: ', event.url);

        const urlSegments = event.urlAfterRedirects.split('/');
        urlSegments.pop(); // remove last segment
        const urlBeforeLastSegment = urlSegments.join('/');
        console.log('URL before last segment: ', urlBeforeLastSegment);

        console.log(this.router?.config[0].path)
        for (const route of this.router?.config[0]?.children) {
          console.log(route)
            if(event.urlAfterRedirects.includes(route.path)) {
              console.log("actual route: ", event.urlAfterRedirects.substr(0, event.urlAfterRedirects.indexOf(route.path)));
            }
          }

      });

  }

}
