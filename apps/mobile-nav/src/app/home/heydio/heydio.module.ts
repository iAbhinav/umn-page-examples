import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HeydioComponent } from "./heydio.component";
import { PageModule } from "@umun-tech/page";
import { CreateHeydioComponent } from "./create-heydio.component";
import { UpdateHeydioComponent } from "./update-heydio.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
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
          },
          {
            path: "create",
            component: CreateHeydioComponent
          },
          {
            path: "update",
            component: UpdateHeydioComponent
          }
        ]
      }
    ]),
    PageModule
  ],
  declarations: [
    HeydioComponent,
    CreateHeydioComponent,
    UpdateHeydioComponent
    ],
  exports: [
    RouterModule
  ]
})
export class HeydioModule {

}
