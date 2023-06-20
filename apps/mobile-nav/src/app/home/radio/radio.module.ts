import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { RadioComponent } from "./radio.component";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RadioComponent
      }
    ])
    ],
  declarations: [
    RadioComponent
    ],
  exports: [
    RouterModule
  ]
})
export class RadioModule {

}
