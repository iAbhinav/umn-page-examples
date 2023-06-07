import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { PageComponent } from "./page.component";
import { CoreModule } from "@umun-tech/core";
import { BackComponent } from "./back/back.component";
import { PathDirective } from "./directives/path.directive";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    CoreModule
  ],
  exports: [
    PageComponent,
    BackComponent,
    PathDirective
  ],
  declarations: [
    PageComponent,
    BackComponent,
    PathDirective
  ]
})
export class PageModule {

}
