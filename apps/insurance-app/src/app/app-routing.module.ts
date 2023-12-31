import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'insurance',
    loadChildren: () => import('./insurance-page/insurance-page.module').then(m => m.InsurancePageModule)
  },
  {
    path: '',
    redirectTo: 'insurance',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
