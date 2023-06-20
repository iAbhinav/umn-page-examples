import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { XeydioComponent } from "./xeydio.component";
import { PageModule } from "@umun-tech/page";
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: XeydioComponent,
        children: [
          {
            path: "",
            loadChildren: () => import("./../empty/empty.module").then(m => m.EmptyModule)
          },
          {
            path: 'beydio',
            loadChildren: () => import('./../beydio/beydio.module').then(m=>m.BeydioModule)
          }
        ]

      }
    ]),
    PageModule
  ],
  declarations: [
    XeydioComponent
    ],
  exports: [
    RouterModule
  ]
})
export class XeydioModule {

}
