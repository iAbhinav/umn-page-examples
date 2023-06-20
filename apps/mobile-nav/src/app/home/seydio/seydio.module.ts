import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SeydioComponent } from "./seydio.component";
import { PageModule } from "@umun-tech/page";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: SeydioComponent,
        children: [
          {
            path: "",
            loadChildren: () => import("./../empty/empty.module").then(m => m.EmptyModule)
          },
          {
            path: "deydio",
            loadChildren: () => import("./../deydio/deydio.module").then(m => m.DeydioModule)
          },
          {
            path: "aeydio",
            loadChildren: () => import("./../aeydio/aeydio.module").then(m => m.AeydioModule)
          }
        ]
      }
    ]),
    PageModule
  ],
  declarations: [
    SeydioComponent
    ],
  exports: [
    RouterModule
  ]
})
export class SeydioModule {

}
