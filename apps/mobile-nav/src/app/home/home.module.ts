import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { PortalModule } from "../portal/portal.module";
import { NavBarModule } from "../nav-bar/nav-bar.module";
import { NavBarItemModule } from "../nav-bar-item/nav-bar-item.module";
import { PageModule } from "../page/page.module";

@NgModule({

  imports: [
    CommonModule,
    IonicModule,
    PortalModule,
    NavBarModule,
    NavBarItemModule,
    RouterModule.forChild([
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
            path: "explorer",
            loadChildren: () => import("./finder/explorer.module").then(m => m.FinderModule)
          },
          {
            path: "",
            pathMatch: "full",
            redirectTo: "radio"
          }
        ]
      }
    ]),
    PageModule
  ],
  exports: [
    RouterModule
  ],
  declarations :[HomeComponent]
})
export class HomeModule {

}
