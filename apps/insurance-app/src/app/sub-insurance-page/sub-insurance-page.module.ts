import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PageModule } from "@umun-tech/page";
import { RouterModule } from "@angular/router";
import { SubInsurancePage } from "./sub-insurance.page";
import { EmptyComponent } from "../../../../mobile-nav/src/app/home/empty/empty.component";

@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    IonicModule,
    PageModule,
    RouterModule.forChild([
      {
        path: "",
        component: SubInsurancePage,
        children: [
          {
            path: '',
            component: EmptyComponent
          }
        ]
      }
    ])
  ],
  declarations:[
    SubInsurancePage
  ],
  exports: [
    RouterModule
  ]
})
export class SubInsurancePageModule {}
