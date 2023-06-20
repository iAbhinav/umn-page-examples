import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { DeydioComponent } from "./deydio.component";
import { PageModule } from "@umun-tech/page";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: DeydioComponent,
        children: [
          {
            path: "",
            loadChildren: () => import("./../empty/empty.module").then(m => m.EmptyModule)
          },
          // {
          //   path: "deydio",
          //   loadChildren: () => DeydioModule
          // },
          {
            path: "xeydio",
            loadChildren: () => import('./../xeydio/xeydio.module').then(m=> m.XeydioModule)
          },
        ]

      }
    ]),
    PageModule
  ],
  declarations: [
    DeydioComponent
    ],
  exports: [
    RouterModule
  ]
})
export class DeydioModule {

}
