import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  HostBinding,
  HostListener,
  OnDestroy,
  QueryList, Renderer2,
  ViewChild
} from "@angular/core";
import { IonRouterOutlet, NavController } from "@ionic/angular";
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from "@angular/router";
import { DisplayService, rootAnimation } from "@umun-tech/core";
import { filter } from "rxjs/operators";
import { LocationStrategy } from "@angular/common";
import { BackComponent } from "./back/back.component";
import { PathDirective } from "./directives/path.directive";
import { PageStackService } from "./page-stack.service";

@Component({
  selector: "umn-page",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    rootAnimation
  ]
})
export class PageComponent implements AfterViewInit, AfterContentInit, OnDestroy {

  static rootPage?: PageComponent;
  static stack: PageComponent[] = [];

  @ContentChildren(RouterLink, { descendants: true }) links?: QueryList<RouterLink>;
  @ContentChildren(PathDirective, { descendants: true }) paths?: QueryList<PathDirective>;
  @ContentChildren(BackComponent, { descendants: true }) backButtons?: QueryList<BackComponent>;
  @HostBinding("class.ion-page") ionPageClass = true;
  @ViewChild("outlet", { static: false, read: IonRouterOutlet }) ionRouterOutlet?: IonRouterOutlet;


  isRootPage = false;
  showOutlet = false;
  isMobile = this.display.isSmall;

  /* contentPath is the path upto the current page's content.
   * it is excluding the outlet path
   * it does not end with '/'
   * to create a child path add / to the end of the parent path
   */
  contentPath: string = "";
  routerColWidth = 400;
  private pathIndex: any;

  parentPath: string | undefined;
  parentPage: PageComponent | undefined;

  private doRootPageThings() {
    // PageComponent.stack = []
    PageComponent.rootPage = this;
  }

  constructor(private router: Router, private display: DisplayService,
              private renderer: Renderer2,
              private navController: NavController,
              private pageStackService: PageStackService,
              private route: ActivatedRoute, private locationStrategy: LocationStrategy,
              private cdr: ChangeDetectorRef) {
    this.setContentPath();
    route.url.subscribe(() => {
      // only called when a page is loaded first time
      this.path = route?.snapshot?.parent?.routeConfig?.path;
      console.log("loaded First Time ", this.path);
      // @ts-ignore
      this.pathIndex = route?.snapshot?._lastPathIndex;

      if (this.pathIndex === 1) {
        this.isRootPage = true;
        this.doRootPageThings();

      }
      // if(this.isMobile){
      this.setShowOutlet();
      this.setContentPath();
      // }

      PageComponent.stack.push(this);
      PageComponent.refreshStack();

      this.cdr.detectChanges();

    });

  }

  push(path?: string) {
    let wantsToOpenContentPath = this.contentPath + "/" + path + "/";

    for (const page of PageComponent.stack) {
      if (page.contentPath == wantsToOpenContentPath) {
        //do nothing since the page is already in stack
        return Promise.reject("Page already in stack");
      }
    }
    let command = (this.contentPath + "/" + path).replace(/\/\//g, "/").split("/");
    return this.navController.navigateForward(command);
  }


  canGoBack(): boolean {
    // @ts-ignore
    const history = this.locationStrategy._platformStrategy.history;
    return history.state && history.state.navigationId > 1;
  }

  @HostListener("window:resize", ["$event"])
  onScreenSizeChange() {
    this.isMobile = this.display.isSmall;
    this.setContentPath();
    this.setShowOutlet();
    this.cdr.detectChanges();
  }


  ngAfterViewInit(): void {

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        //this is called anytime there is change in the url

        console.log("NavigationEnd",
          this.contentPath.replace(/\/\//g, "/"), this.router.url+"/")

        if((this.router.url+"/").indexOf(this.contentPath.replace(/\/\//g, "/"))<0){
          console.log("I don't Exist", this.path, PageComponent.stack, PageComponent.stack.indexOf(this))
          if(PageComponent.stack.indexOf(this) > -1){
            PageComponent.stack.splice(PageComponent.stack.indexOf(this), 1)
          }

          console.log(PageComponent.stack, PageComponent.stack.indexOf(this))
        }

        //check here, that after navigation, is this page still in url
        //if not remove from stack




        // if(this.isMobile){
        //only to be done in mobile
        this.doRootPageThings();
        PageComponent.refreshStack();
        this.setShowOutlet();
        this.cdr.detectChanges();
        // }


      });


    this.scrollIntoView();

  }

  get outletState() {
    return this.showOutlet ? "in" : "out";
  }

  private setShowOutlet() {
    try {
      // navigation has ended, you could trigger any necessary actions here
      this.showOutlet = this.ionRouterOutlet?.component?.constructor?.name != undefined
        && this.ionRouterOutlet?.component?.constructor?.name != "EmptyComponent";
      this.cdr.detectChanges();
    } catch (e) {

    }
  }

  private setContentPath() {
    this.contentPath = this.route.snapshot.pathFromRoot.map(part => part.url.map(segment => segment.path).join("/")).join("/");
  }


  scrollIntoView() {
    setTimeout(() => {
      const parentElement = document.querySelector(".top-row") as HTMLElement;
      if (parentElement) {

        parentElement.scrollLeft = parentElement.scrollWidth; // Set initial scroll position to the rightmost side.
        const scrollAmount = parentElement.scrollWidth - parentElement.clientWidth;
        let animationDuration: number = 700; //IMPORTANT:animationDuration should be more than the time of rootAnimation which is 500ms
        const startTime = performance.now();
        const duration = animationDuration; // Animation duration in milliseconds

        function scrollAnimation(timestamp: number) {
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = easeOutQuad(progress);
          parentElement.scrollLeft = parentElement.scrollWidth - (scrollAmount * ease); // Change scroll direction to the left.

          if (elapsed < duration) {
            requestAnimationFrame(scrollAnimation);
          }
        }

        function easeOutQuad(progress: number) {
          return 1 - Math.pow(1 - progress, 2);
        }

        requestAnimationFrame(scrollAnimation);
        this.cdr.detectChanges();
      }

    });
  }


  path?: string = "";
  depth: number = 0;


  static refreshStack() {

    let parentPage: PageComponent | undefined;

    PageComponent.stack.sort((a, b) => a.pathIndex - b.pathIndex);

    PageComponent.stack.forEach((page, index) => {
      page.depth = PageComponent.stack.length - page.pathIndex;

      page.routerColWidth = 400 * (page.depth + 1);

      page.parentPage = parentPage;
      parentPage = page;

    });


  }

  ngOnDestroy(): void {
  if(PageComponent.stack.indexOf(this) > -1){
    PageComponent.stack.splice(PageComponent.stack.indexOf(this), 1);
    PageComponent.refreshStack();
  }

  }

  ngAfterContentInit(): void {
    this.backButtons?.forEach((button) => {
      button.parentPath = this.parentPage?.contentPath;
    });

    this.paths?.forEach(path => {
      path.page = this;
    });

    this.links?.forEach(link => {
      // // @ts-ignore
      // if(link?.command && link?.command[0]?.indexOf(this.path) > -1){
      //   // @ts-ignore
      //   link.el.nativeElement.disabled = true
      // }

      // @ts-ignore
      this.renderer.listen(link?.el?.nativeElement, "click", (element: any) => {

        // @ts-ignore
        console.log("clicky", this.path, link?.commands[0], PageComponent.stack.indexOf(this), PageComponent.stack);

        let stack: PageComponent[] = [];

        PageComponent.stack.forEach(page => {
          //this should only happen when the router is not active
          // @ts-ignore
          if (link?.commands[0].indexOf(page.path) > -1) {
            stack.push(page);
          }
        });

        PageComponent.stack.sort((a, b) => a.pathIndex - b.pathIndex);

        PageComponent.stack = stack;
        // PageComponent.stack = PageComponent.stack.filter(page => page.contentPath.endsWith(this.path+"/"))
// this.scrollIntoView()
        // PageComponent.stack.splice(PageComponent.stack.indexOf(this));
        if (PageComponent.rootPage) {
          // PageComponent.rootPage.routerColWidth = 800

          // PageComponent.refreshStack();
          // PageComponent.rootPage.depth = PageComponent.stack.length - PageComponent.rootPage.pathIndex;
          //
          // PageComponent.rootPage.routerColWidth = 400 * (PageComponent.rootPage.depth + 1);
        }


        this.cdr.detectChanges();
        return false;
      });
    });
  }
}
