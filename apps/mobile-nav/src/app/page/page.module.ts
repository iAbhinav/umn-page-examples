import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { PageComponent } from "./page.component";
import { BackComponent } from "./back/back.component";
import { PathDirective } from "./directives/path.directive";
import { PageWidthButtonComponent } from "./width-button/page-width-button.component";

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
    PageWidthButtonComponent
  ],
  declarations: [
    PageComponent,
    BackComponent,
    PathDirective,
    PageWidthButtonComponent
  ]
})
export class PageModule {


}
