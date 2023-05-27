import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomePortal } from "./home.portal";

import { employee_entity_name, EmployeeServiceResolver } from "@umun-tech/seminar-workspace-57";

import { task_entity_name, TaskServiceResolver } from "@umun-tech/seminar-workspace-57";


export const routes: Routes = [
  {
    path: "",
    component: HomePortal,
    children: [
      {
        path: "pageOne",
        loadChildren: () => import("./../../page-one/page-one.module").then(m => m.PageOneModule)
      },
      {
        path: "pageTwo",
        loadChildren: () => import("./../../page-two/page-two.module").then(m => m.PageTwoModule)
      },
      {
        path: `${employee_entity_name}/:entityName`,
        loadChildren: () => import("@umun-tech/entity").then(m => m.EntityCrudPageModule),
        resolve: { crudService: EmployeeServiceResolver }
      },
      {
        path: `${task_entity_name}/:entityName`,
        loadChildren: () => import("@umun-tech/entity").then(m => m.EntityCrudPageModule),
        resolve: { crudService: TaskServiceResolver }
      },
      //default path
      {
        path: "",
        // redirectTo: `${employee_entity_name}/${employee_entity_name}`,
        // redirectTo: ,
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
