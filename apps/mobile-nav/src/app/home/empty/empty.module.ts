import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { EmptyComponent } from "./empty.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: EmptyComponent
      }
    ])
    ],
  declarations: [
    EmptyComponent
    ],
  exports: [
    RouterModule
  ]
})
export class EmptyModule {

}
