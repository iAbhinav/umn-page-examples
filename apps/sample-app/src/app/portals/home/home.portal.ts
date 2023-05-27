import { Component, OnInit } from "@angular/core";
import { rootAnimation } from "@umun-tech/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
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
  page1: string = "pageOne";
  page2= "pageTwo";

  //very long array of lrem ipsum
  longArray = Array.from({length: 20}, (_, i) => i);

  constructor(private router: Router){
  }

  ngOnInit() {
  }

}
