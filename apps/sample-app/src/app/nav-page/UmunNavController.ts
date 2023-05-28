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
      return true;
    } else {
      let parentFound;
      potentialParents.forEach(parent => {
        if (route.parentPath.endsWith(parent.path)) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(route);
          parentFound = true;
        } else {
          return this.push(route, parent.children); // Add return statement here
        }
      });
      return parentFound;
    }
  }

  getParentRoute(path: string): any {
    let parentRoute: any = null;

    const findParent = (routes: any[]) => {
      for (const route of routes) {
        console.log(route.children)
        if (route.children) {
          const foundRoute = route.children.find(child => child.path === path);
          if (foundRoute) {
            parentRoute = route;
            return;
          }
          findParent(route.children);
        }
      }
    };

    findParent(UmunNavController.routes);
    return parentRoute;
  }

  findSiblings(path: string): any[] {
    let siblings = []
    this.getParentRoute(path)?.children?.forEach(x => {
      if(x.path != path) {
        siblings.push(x)
      }
    })
    return siblings;
  }

  pop(path: any) {
    let siblings = this.findSiblings(path);
    if(this.getParentRoute(path)){
      this.getParentRoute(path).children = siblings
    }

    return siblings;
  }
}
