import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HeydioComponent } from "./heydio.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HeydioComponent
      }
    ])
    ],
  declarations: [
    HeydioComponent
    ],
  exports: [
    RouterModule
  ]
})
export class HeydioModule {

}
