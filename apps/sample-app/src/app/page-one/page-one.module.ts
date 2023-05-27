import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { PageOneComponent, pageOneRoutes } from "./page-one.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NavPageModule } from "../nav-page/nav-page.module";
import { CoreModule } from "@umun-tech/core";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(pageOneRoutes),
    NavPageModule,
    CoreModule
  ],
  declarations: [PageOneComponent],
  exports: [
    RouterModule
  ]

})
export class PageOneModule {

}
