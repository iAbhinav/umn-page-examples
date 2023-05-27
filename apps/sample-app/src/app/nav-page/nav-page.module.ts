import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { NavPage } from "./nav-page.component";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([]),
  ],
  declarations: [
    NavPage
  ],
  exports: [
    NavPage

  ]
})
export class NavPageModule {

}
