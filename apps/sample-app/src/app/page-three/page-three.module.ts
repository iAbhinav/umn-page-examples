import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NavPageModule } from "../nav-page/nav-page.module";
import { CoreModule } from "@umun-tech/core";
import { PageThreeComponent } from "./page-three.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: PageThreeComponent,
      }
    ]),
    NavPageModule,
    CoreModule
  ],
  declarations: [PageThreeComponent],
  exports: [
    RouterModule
  ]

})
export class PageThreeModule {

}
