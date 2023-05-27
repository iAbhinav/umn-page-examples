import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NavPageModule } from "../nav-page/nav-page.module";
import { CoreModule } from "@umun-tech/core";
import { PageTwoComponent } from "./page-two.component";
import { PageThreeComponent } from "../page-three/page-three.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: PageTwoComponent,
        children: [
          {
            path: "pageThree",
            loadChildren: () => import("../page-three/page-three.module").then(m => m.PageThreeModule),
            data: {
              path: "pageThree"
            }
          },
        ]
      }
    ]),
    NavPageModule,
    CoreModule
  ],
  declarations: [PageTwoComponent],
  exports: [
    RouterModule
  ]

})
export class PageTwoModule {

}
