import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { UmunRouterModule } from "../umun-router.module";
import { PortalModule } from "../portal/portal.module";
import { AppModule } from "../app.module";
import { NavBarModule } from "../nav-bar/nav-bar.module";
import { NavBarItemModule } from "../nav-bar-item/nav-bar-item.module";

@NgModule({

  imports: [
    CommonModule,
    IonicModule,
    PortalModule,
    NavBarModule,
    NavBarItemModule,
    UmunRouterModule.forRoot([
      {
        path: "",
        component: HomeComponent,
        children: [
          {
            path: "radio",
            loadChildren: () => import("./radio/radio.module").then(m => m.RadioModule)
          },
          // {
          //   path: 'heydio',
          //   loadChildren: () => import('./heydio/heydio.module').then(m=>m.HeydioModule)
          // },
          {
            path: "play-now",
            loadChildren: () => import("./pay-now/play-now.module").then(m => m.PlayNowModule)
          },
          {
            path: "",
            pathMatch: "full",
            redirectTo: "radio"
          }
        ]
      }
    ]),
  ],
  exports: [
    RouterModule
  ],
  declarations :[HomeComponent]
})
export class HomeModule {

}
