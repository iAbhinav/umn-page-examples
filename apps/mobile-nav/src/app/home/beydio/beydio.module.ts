import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PageModule } from "../../page/page.module";
import { BeydioComponent } from "./beydio.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: BeydioComponent,
        children: [
          {
            path: "",
            loadChildren: () => import("./../empty/empty.module").then(m => m.EmptyModule)
          },
          {
            path: "aeydio",
            loadChildren: () => import('./../aeydio/aeydio.module').then(m=> m.AeydioModule)
          },
        ]

      }
    ]),
    PageModule
  ],
  declarations: [
    BeydioComponent
    ],
  exports: [
    RouterModule
  ]
})
export class BeydioModule {

}
