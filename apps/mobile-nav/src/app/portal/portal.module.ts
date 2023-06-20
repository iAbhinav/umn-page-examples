import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { PortalComponent } from "./portal.component";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    PortalComponent
  ],
  exports: [
    PortalComponent
  ]
})
export class PortalModule {

}
