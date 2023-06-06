import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NavPageModule } from "../nav-page/nav-page.module";
import { CoreModule } from "@umun-tech/core";
import { PageThreeComponent } from "./page-three.component";
import { PageFourComponent } from "./page-four.component";
import { PageFiveComponent } from "./page-five.component";
import { PageSixComponent } from "./page-six.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: PageThreeComponent,
        children: [
          {
            path: 'four',
            component: PageFourComponent,
            children: [
              {
                path: 'five',
                component: PageFiveComponent,
                children: [
                  {
                    path: 'six',
                    component: PageSixComponent
                  }
                  ]
              }
            ]
          }
        ]
      }
    ]),
    NavPageModule,
    CoreModule
  ],
  declarations: [PageThreeComponent, PageFourComponent, PageFiveComponent, PageSixComponent],
  exports: [
    RouterModule
  ]

})
export class PageThreeModule {

}
