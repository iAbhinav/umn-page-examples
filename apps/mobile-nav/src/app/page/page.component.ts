import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  QueryList,
  Renderer2,
  ViewChild
} from "@angular/core";
import { IonRouterOutlet, NavController } from "@ionic/angular";
import { ActivatedRoute, NavigationEnd, Params, QueryParamsHandling, Router } from "@angular/router";
import { rootAnimation } from "@umun-tech/core";
import { filter } from "rxjs/operators";
import { LocationStrategy } from "@angular/common";
import { BackComponent } from "./back/back.component";
import { PathDirective } from "./directives/path.directive";
import { PageStackService } from "./page-stack.service";
import { PageWidthButtonComponent } from "./width-button/page-width-button.component";
import { PageHelper } from "./services/page-helper.service";

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

  @Input() emptyComponentClassName = "EmptyComponent";
  @Input() contentWidthDesktopExpanded = 600;
  @Input() set contentWidthDesktop(value: number) {
    this._contentWidthDesktop = value;
    if(!this.initialContentWidth){
      this.initialContentWidth = value;
    }
    PageComponent.refreshStack()
    this.cdr.detectChanges();
  }
  get contentWidthDesktop() {
    return this._contentWidthDesktop;
  }
  get routerOutletWidth() {
    return this._routerOutletWidth
  }
  private _contentWidthDesktop: number = 400;


  @ContentChildren(PathDirective, { descendants: true }) paths?: QueryList<PathDirective>;
  @ContentChildren(PageWidthButtonComponent, { descendants: true }) widthButtons?: QueryList<PageWidthButtonComponent>;
  @ContentChildren(BackComponent, { descendants: true }) backButtons?: QueryList<BackComponent>;
  @HostBinding("class.ion-page") ionPageClass = true;
  @ViewChild("outlet", { static: false, read: IonRouterOutlet }) ionRouterOutlet?: IonRouterOutlet;

  initialContentWidth = 0;
  isRootPage = false;
  showOutlet = false;
  isMobile = this.display.isMobile;

  /* contentPath is the path upto the current page's content.
   * it is excluding the outlet path
   * it does not end with '/'
   * to create a child path add / to the end of the parent path
   */
  contentPath: string = "";


  /**
   * It is the path open in the ion-router-outlet
   */
  path?: string = "";
  parentPage: PageComponent | undefined;
  /**
   * Depth of the page in the page stack
   * For Root Page pageIndex = 1 and depth is the number of children it has
   *
   * page -> A -> B -> C -> D
   * depth-> 3 -> 2 -> 1 -> 0
   * index-> 1 -> 2 -> 3 -> 4
   *
   */
  private depth: number = 0;
  /**
   * Reverse of the depth
   * For Root Page pageIndex = 1 and depth is the number of children it has
   * @private
   */
  private pathIndex: any;
  private _routerOutletWidth = 400;

  private doRootPageThings() {
    // PageComponent.stack = []
    PageComponent.rootPage = this;
  }

  constructor(private router: Router, private display: PageHelper,
              private renderer: Renderer2,
              private navController: NavController,
              private pageStackService: PageStackService,
              private route: ActivatedRoute, private locationStrategy: LocationStrategy,
              private cdr: ChangeDetectorRef) {
    this.setContentPath();
    route.url.subscribe(() => {
      // only called when a page is loaded first time
      this.path = route?.snapshot?.parent?.routeConfig?.path;
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

  push(path: string | undefined, params: Params | null | undefined, paramsHandling: QueryParamsHandling = "merge") {
    if (!path) {
      return Promise.reject("Null path cannot be pushed in the outled");
    }
    let wantsToOpenContentPath = this.contentPath + "/" + path + "/";

    for (const page of PageComponent.stack) {
      if (page.contentPath == wantsToOpenContentPath) {
        //do nothing since the page is already in stack
        return Promise.reject("Page already in stack");
      }
    }
    let command = (this.contentPath + "/" + path).replace(/\/\//g, "/").split("/");
    // let options = params? { queryParams: params,  queryParamsHandling: 'preserve'} : undefined;
    return this.navController.navigateForward(command,
      { queryParams: params, queryParamsHandling: paramsHandling });
  }


  canGoBack(): boolean {
    // @ts-ignore
    const history = this.locationStrategy._platformStrategy.history;
    return history.state && history.state.navigationId > 1;
  }

  @HostListener("window:resize", ["$event"])
  onScreenSizeChange() {
    this.isMobile = this.display.isMobile;
    this.setContentPath();
    this.setShowOutlet();
    this.cdr.detectChanges();
  }


  ngAfterViewInit(): void {

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        //this is called anytime there is change in the url

        let urlWithoutParams = this.router.url.split("?")[0] + "/";

        if (urlWithoutParams.indexOf(this.contentPath.replace(/\/\//g, "/")) < 0) {
          if (PageComponent.stack.indexOf(this) > -1) {
            PageComponent.stack.splice(PageComponent.stack.indexOf(this), 1);
          }
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
        && this.ionRouterOutlet?.component?.constructor?.name != this.emptyComponentClassName;
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

  static refreshStack() {

    let parentPage: PageComponent | undefined;

    PageComponent.stack.sort((a, b) => a.pathIndex - b.pathIndex);

    PageComponent.stack.forEach((page, index) => {
      page.depth = PageComponent.stack.length - page.pathIndex;

      // page._routerOutletWidth = 400 * (page.depth + 1);

      page.parentPage = parentPage;
      parentPage = page;

    });

    let totalWidth = 0;
    for (let index = PageComponent.stack.length-1; index >=0; index--){
      const page = PageComponent.stack[index];
      // page -> A -> B -> C -> D
      // depth-> 3 -> 2 -> 1 -> 0
      // index-> 1 -> 2 -> 3 -> 4
      page._routerOutletWidth = page._contentWidthDesktop + totalWidth;
      totalWidth = page._routerOutletWidth;
    }


  }

  ngOnDestroy(): void {
    if (PageComponent.stack.indexOf(this) > -1) {
      PageComponent.stack.splice(PageComponent.stack.indexOf(this), 1);
      PageComponent.refreshStack();
    }
  }

  ngAfterContentInit(): void {
    if(!this.initialContentWidth){
      this.initialContentWidth = this.contentWidthDesktop
    }
    this.backButtons?.forEach((button) => {
      button.parentPath = this.parentPage?.contentPath;
    });

    this.paths?.forEach(path => {
      path.page = this;
    });
    this.widthButtons?.forEach(path => {
      path.page = this;
    });
  }
}
