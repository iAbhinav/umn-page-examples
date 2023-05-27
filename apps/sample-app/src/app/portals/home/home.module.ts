import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { IamComponentsModule } from "@umun-tech/iam";
import { CoreModule } from "@umun-tech/core";

import { HomePortal } from "./home.portal";
import { HomeRoutingModule } from "./home-routing.module";
import { NavPageModule } from "../../nav-page/nav-page.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeRoutingModule,
    IamComponentsModule,
    CoreModule,
    NavPageModule
  ],
  declarations: [HomePortal],

})
export class HomeModule {

}
