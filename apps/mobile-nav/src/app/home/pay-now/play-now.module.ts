import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PlayNowComponent } from "./play-now.component";
import { CoreModule } from "@umun-tech/core";
import { PageModule } from "../../page/page.module";
import { EmptyComponent } from "../empty/empty.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: "",
        component: PlayNowComponent,
        children: [
          {
            path: "",
            component: EmptyComponent
          },
          {
            path: "heydio/:id",
            loadChildren: () => import("./../heydio/heydio.module").then(m => m.HeydioModule)
          },
          {
            path: "seydio",
            loadChildren: () => import("./../seydio/seydio.module").then(m => m.SeydioModule)
          }
        ]
      }
    ]),
    PageModule
  ],
  declarations: [
    PlayNowComponent
  ],
  exports: [
    RouterModule
  ]
})
export class PlayNowModule {

}
