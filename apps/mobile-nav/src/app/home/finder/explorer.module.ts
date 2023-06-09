import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { PageModule } from "../../page/page.module";
import { RouterModule } from "@angular/router";
import { EmptyComponent } from "../empty/empty.component";
import { CommonModule } from "@angular/common";
import { ExplorerPageComponent } from "./explorer.component";

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    PageModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: ExplorerPageComponent,
        children: [
          {
            path: "",
            component: EmptyComponent
          },
          {
            path: ":id",
            loadChildren: () => import("./finder.module").then(m => m.FinderModule)
          }
        ],
      },
    ])
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    ExplorerPageComponent
  ]
})
export class FinderModule {

}
