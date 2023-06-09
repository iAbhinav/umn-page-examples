import { Injectable } from "@angular/core";
import { PageComponent } from "../page.component";

@Injectable({
  providedIn: "root"
})
export class PageController {

  private rootPages: PageComponent[] = [];

  push(page: PageComponent) {

    let myRoot;
    if (page?.isRootPage) {
      myRoot = page
      this.remove(page);
      this.rootPages.push(page);
    } else {
      myRoot = this.getMyRoot(page);
    }

    if (myRoot) {
      myRoot.myStack = myRoot.myStack?.filter((p:any) => p.pathIndex < page.pathIndex);
      myRoot?.myStack.push(page);
      console.log("My Stack", page.contentPath, myRoot.myStack.map((page:any) => page.contentPath))
      this.refreshStack(myRoot.myStack);
    }
  }

  refreshStack(stack: PageComponent[]) {
    let totalWidth = 0;
    for (let index = stack.length - 1; index >= 0; index--) {
      const page = stack[index];
      page.depth = stack.length - page.pathIndex;
      if (page?.desktopPage) {
        page.desktopPage.routerOutletWidth = page.desktopPage.contentWidthDesktop + totalWidth;
        totalWidth = page.desktopPage.routerOutletWidth;
      }
    }
  }

  remove(page: PageComponent) {
    if (page?.isRootPage) {
      this.rootPages = this.rootPages.filter(p => p.contentPath != page.contentPath);
    }
  }

  getMyRoot(page: PageComponent) {
    return this.rootPages.find(rootPage => page.contentPath.startsWith(rootPage.contentPath));
  }
}
