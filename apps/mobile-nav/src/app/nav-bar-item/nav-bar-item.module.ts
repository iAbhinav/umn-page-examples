import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { NavBarItemComponent } from "./nav-bar-item.component";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    NavBarItemComponent
  ],
  exports: [
    NavBarItemComponent
  ]
})
export class NavBarItemModule {

}
