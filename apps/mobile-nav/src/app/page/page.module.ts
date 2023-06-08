import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { PageComponent } from "./page.component";
import { PathDirective } from "./directives/path.directive";
import { BackComponent } from "./components/back/back.component";
import { PageWidthButtonComponent } from "./components/width-button/page-width-button.component";
import { PageMobileComponent } from "./components/page-mobile/page-mobile.component";
import { PageDesktopComponent } from "./components/page-desktop/page-desktop.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
  ],
  exports: [
    PageComponent,
    BackComponent,
    PathDirective,
    PageWidthButtonComponent,
    PageDesktopComponent
  ],
  declarations: [
    PageComponent,
    BackComponent,
    PathDirective,
    PageWidthButtonComponent,
    PageMobileComponent,
    PageDesktopComponent
  ]
})
export class PageModule {


}
