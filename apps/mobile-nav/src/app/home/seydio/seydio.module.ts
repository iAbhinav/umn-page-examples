import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { SeydioComponent } from "./seydio.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SeydioComponent
      }
    ])
    ],
  declarations: [
    SeydioComponent
    ],
  exports: [
    RouterModule
  ]
})
export class SeydioModule {

}
