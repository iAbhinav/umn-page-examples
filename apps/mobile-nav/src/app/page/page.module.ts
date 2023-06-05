import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { PageComponent } from "./page.component";
import { CoreModule } from "@umun-tech/core";
import { BackComponent } from "./back/back.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule,
    CoreModule
  ],
  exports: [
    PageComponent,
    BackComponent
  ],
  declarations: [
    PageComponent,
    BackComponent
  ]
})
export class PageModule {

}
