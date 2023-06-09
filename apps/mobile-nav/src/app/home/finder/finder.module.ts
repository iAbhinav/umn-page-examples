import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { PageModule } from "../../page/page.module";
import { FinderPageComponent } from "./finder.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { EmptyComponent } from "../empty/empty.component";

@NgModule({
  imports: [
    IonicModule,
    FormsModule,
    PageModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FinderPageComponent,
        children: [
          {
            path: '',
            component: EmptyComponent
          },
          {
            path: ':id',
            loadChildren: () => import('./finder.module').then(m => m.FinderModule)
          }
        ]
      },
      {
        path: '',
        component: EmptyComponent
      },

    ])
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    FinderPageComponent
  ]
})
export class FinderModule {

}
