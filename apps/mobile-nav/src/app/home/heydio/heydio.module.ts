import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HeydioComponent } from "./heydio.component";
import { PageModule } from "../../page/page.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: HeydioComponent,
        children: [
          {
            path: "",
            loadChildren: () => import("./../empty/empty.module").then(m => m.EmptyModule)
          },
          {
            path: "deydio",
            loadChildren: () => import("./../deydio/deydio.module").then(m => m.DeydioModule)
          }
        ]
      }
    ]),
    PageModule
  ],
  declarations: [
    HeydioComponent
    ],
  exports: [
    RouterModule
  ]
})
export class HeydioModule {

}
