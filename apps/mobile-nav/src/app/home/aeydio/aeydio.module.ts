import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AeydioComponent } from "./aeydio.component";
import { PageModule } from "@umun-tech/page";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: AeydioComponent,
        children: [
          {
            path: "",
            loadChildren: () => import("./../empty/empty.module").then(m => m.EmptyModule)
          },
          // {
          //   path: "deydio",
          //   loadChildren: () => DeydioModule
          // },
          // {
          //   path: "xeydio",
          //   loadChildren: () => import('./../xeydio/xeydio.module').then(m=> m.XeydioModule)
          // },
        ]

      }
    ]),
    PageModule
  ],
  declarations: [
    AeydioComponent
    ],
  exports: [
    RouterModule
  ]
})
export class AeydioModule {

}
