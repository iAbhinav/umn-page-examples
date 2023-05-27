import { Injectable } from "@angular/core";
import { NavPage } from "./nav-page.component";

@Injectable({
  providedIn: "root"
})
export class UmunNavController {
  static routes: any[] = [];

  push(route: { path: string; basePath: string, parentPath: string, isRoot: boolean, navPage: NavPage, children?: any[] }, potentialParents = UmunNavController.routes) {
    if (route.isRoot) {
      let savedRoute = potentialParents.filter(r => r.path == route.path);
      if (savedRoute.length == 0) {
        UmunNavController.routes.push(route);
      } else {
        savedRoute[0].navPage = route.navPage;
      }
      console.log("Saved Root", route.path)
      return true;
    } else {
      let parentFound;
      potentialParents.forEach(parent => {
        console.log("Checking", parent.path, route.parentPath)
        if (route.parentPath.endsWith(parent.path)) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(route);
          console.log("Found Parent", parent.path, parent.children)
          parentFound = true;
        } else {
          return this.push(route, parent.children); // Add return statement here
        }
      });
      return parentFound;
    }
  }

  pop(path: string) {
    let removedRoute = null;

    const findAndRemoveRoute = (routes: any[]) => {
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].path === path) {
          removedRoute = routes.splice(i, 1)[0];
          break;
        }
        if (routes[i].children) {
          findAndRemoveRoute(routes[i].children);
        }
      }
    };

    findAndRemoveRoute(UmunNavController.routes);

    console.log("Removed Route", removedRoute);
    return removedRoute;
  }
}
