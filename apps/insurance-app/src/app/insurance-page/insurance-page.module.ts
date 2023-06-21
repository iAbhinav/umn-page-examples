import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { PageModule } from "@umun-tech/page";
import { InsurancePage } from "./insurance.page";
import { RouterModule } from "@angular/router";
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
        component: InsurancePage,
        children: [
          {
            path: "",
            component: EmptyComponent,
          },
          {
            path: "sub",
            loadChildren: ()=>import("../sub-insurance-page/sub-insurance-page.module").then(m=>m.SubInsurancePageModule)
          },
          {
            path: "sub2",
            loadChildren: ()=>import("../sub-insurance-page/sub-insurance-page.module").then(m=>m.SubInsurancePageModule)
          }
        ]
      }
    ])
  ],
  declarations:[
    InsurancePage
  ],
  exports: [
    RouterModule
  ]
})
export class InsurancePageModule {}
