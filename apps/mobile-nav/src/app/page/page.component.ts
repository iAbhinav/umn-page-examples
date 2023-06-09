import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  ViewChild
} from "@angular/core";
import { IonRouterOutlet, NavController } from "@ionic/angular";
import { ActivatedRoute, NavigationEnd, Params, QueryParamsHandling, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { LocationStrategy } from "@angular/common";
import { PathDirective } from "./directives/path.directive";
import { PageHelper } from "./services/page-helper.service";
import { PageWidthButtonComponent } from "./components/width-button/page-width-button.component";
import { BackComponent } from "./components/back/back.component";
import { PageMobileComponent } from "./components/page-mobile/page-mobile.component";
import { PageDesktopComponent } from "./components/page-desktop/page-desktop.component";
import { ScreenSizeService } from "./services/screen-size.service";
import { Subscription } from "rxjs";

@Component({
  selector: "umn-page",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PageComponent implements AfterViewInit, AfterContentInit, OnDestroy {

  static rootPage?: PageComponent;
  static stack: PageComponent[] = [];

  static refreshStack() {
    let parentPage: PageComponent | undefined;
    PageComponent.stack.sort((a, b) => a.pathIndex - b.pathIndex);
    PageComponent.stack.forEach((page, index) => {
      page.depth = PageComponent.stack.length - page.pathIndex;
      page.parentPage = parentPage;
      parentPage = page;
    });
    let totalWidth = 0;
    for (let index = PageComponent.stack.length - 1; index >= 0; index--) {
      const page = PageComponent.stack[index];
      if (page?.desktopPage) {
        page.desktopPage.routerOutletWidth = page.desktopPage.contentWidthDesktop + totalWidth;
        totalWidth = page.desktopPage.routerOutletWidth;
      }
    }
  }

  @Output() pathChange = new EventEmitter<string>();

  @Input() emptyComponentClassName = "EmptyComponent";
  @Input() contentWidthDesktopExpanded = 600;
  @Input() widthUnit = "px";

   private _contentWidthDesktop?: number;

  @Input() set label(value: string | undefined) {
    this._label = value;
  }

  @Input() set desktopViewType(value: "column" | "full_screen" | undefined) {
    if (undefined === value) {
      value = "full_screen";
    } else if(value == this._desktopViewType){
      return;
    }
    this._desktopViewType = value;
    this.isMobile = this.display.isMobile;
    if (this.isMobile || value == "full_screen") {
      this.isColumn = false;
    } else {
      this.isColumn = true;
    }
    this.onWindowResize(null);
  }

  @Input() set contentWidthDesktop(value: number) {
    if(this.desktopPage)
      this.desktopPage.contentWidthDesktop = value;
    this._contentWidthDesktop = value;
  }

  get contentWidthDesktop(): number {
    return <number>this._contentWidthDesktop;
  }

  get desktopViewType(): "column" | "full_screen" {
    return this._desktopViewType;
  }

  get label(): string | undefined {
    return this._label ? this._label : this.path;
  }

  get stack(): PageComponent[] {
    return PageComponent.stack;
  }


  @ContentChildren(PathDirective, { descendants: true }) paths?: QueryList<PathDirective>;
  @ContentChildren(PageWidthButtonComponent, { descendants: true }) widthButtons?: QueryList<PageWidthButtonComponent>;
  @ContentChildren(BackComponent, { descendants: true }) backButtons?: QueryList<BackComponent>;
  @HostBinding("class.ion-page") ionPageClass = true;
  @ViewChild("outlet", { static: false, read: IonRouterOutlet }) ionRouterOutlet?: IonRouterOutlet;
  @ViewChild("mobilePage", { static: false, read: PageMobileComponent }) mobilePage?: PageMobileComponent;
  @ViewChild("desktopPage", { static: false, read: PageDesktopComponent }) desktopPage?: PageDesktopComponent;


  isRootPage = false;
  isMobile = this.display.isMobile;
  isColumn: boolean;
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
  private _label?: string = "";
  private _desktopViewType: "column" | "full_screen" = "column";
  private screenSizeSubscription!: Subscription;

  constructor(private router: Router, private display: PageHelper,
              private renderer: Renderer2,
              private navController: NavController,
              private screen: ScreenSizeService,
              private route: ActivatedRoute, private locationStrategy: LocationStrategy,
              private cdr: ChangeDetectorRef) {
    this.isColumn = !this.isMobile && this.desktopViewType == "column";
    this.setContentPath();
    route.url.subscribe(() => {
      // only called when a page is loaded first time
      this.setPath();
      // @ts-ignore
      this.pathIndex = route?.snapshot?._lastPathIndex;

      if (this.pathIndex === 1) {
        this.isRootPage = true;
        PageComponent.rootPage = this;
        // this.ngZone.runOutsideAngular(() => {
          window.addEventListener("resize", this.onWindowResize.bind(this));

        // });
        this.screenSizeSubscription?.unsubscribe();
       this.screenSizeSubscription = this.screen.screenSizeChange$.subscribe($event => {
          this.onWindowResize($event)
        })
      }
      this.setContentPath();
      PageComponent.stack = PageComponent.stack.filter(page => page.pathIndex < this.pathIndex);
      PageComponent.stack.push(this);
      PageComponent.refreshStack();
      this.cdr.detectChanges();
    });
  }

  private setPath() {

    let _path = this.route?.snapshot?.parent?.routeConfig?.path;
    if (_path && _path?.indexOf(":") > -1) {
      let replaceParamsInPath = (path: any, params: any) => {
        return path.split("/").map((segment: any) => {
          if (segment.startsWith(":")) {
            const paramKey = segment.slice(1);  // remove the leading ':'
            return params[paramKey] || segment;
          }
          return segment;
        }).join("/").replace(/^\/|\/$/g, "");
      };

      _path = replaceParamsInPath(_path, this.route?.snapshot?.parent?.params);

    }
    this.path = _path;
    this.pathChange.emit(this.path);
  }

  /**
   * Open a page
   * Desktop: Opens a page in right hand of the current page
   * Mobile: Opens a page in the full screen on top of the current page
   *
   * @param path: Immediate child path of the current page
   * @param params: Query params to be passed to the page
   * @param paramsHandling: How to handle the query params "merge" or "preserve"
   * @param force: If true, the page will be opened even if it is already in the stack
   */
  async push(path: string | undefined, params: Params | null | undefined = undefined,
             paramsHandling: QueryParamsHandling = "merge", force = false) {
    if (!path) {
      return Promise.reject("Null path cannot be pushed in the outled");
    }
    let wantsToOpenContentPath = this.contentPath + "/" + path + "/";

    for (const page of PageComponent.stack) {
      if (page.contentPath == wantsToOpenContentPath) {
        //do nothing since the page is already in stack
        if (!force) {
          return Promise.reject("Page already in stack");
        } else {
          await this.navController.navigateForward((this.contentPath.substr(0, this.contentPath.length - 1)).replace(/\/\//g, "/").split("/"), {
            queryParams: params,
            queryParamsHandling: paramsHandling
          });
        }
      }
    }
    PageComponent.stack = PageComponent.stack.filter(page => page.pathIndex <= this.pathIndex);
    let command = (this.contentPath + "/" + path).replace(/\/\//g, "/").split("/");
    return this.navController.navigateForward(command,
      { queryParams: params, queryParamsHandling: paramsHandling }).then(res => {
      return res;
    });

  }

  /**
   * If you have the reference of a page, you may open the page without
   * knowing the path of the page
   */
  async navigateToThisPage() {
    this.navController.navigateForward([this.contentPath],
      { queryParamsHandling: "merge" }).then(res => {
      this.cdr.detectChanges();
      setTimeout(() => {
        this.cdr.detectChanges();
      }, 700);
    });
  }


  onWindowResize(event: any) {
    this.isMobile = this.display.isMobile;
    this.isColumn = !this.isMobile && this.desktopViewType == "column";
    if(!this.isColumn){
      PageComponent.stack.forEach(page => {
        page.mobilePage?.setShowOutlet();
      });
    }
    this.mobilePage?.setShowOutlet();
    this.cdr.detectChanges();
  }

  ngAfterViewInit(): void {
    this.contentWidthDesktop = 400;
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        //this is called anytime there is change in the url
        let urlWithoutParams = this.router.url.split("?")[0] + "/";
        if (urlWithoutParams.indexOf(this.contentPath.replace(/\/\//g, "/")) < 0) {
          //this page is not in the stack
          if (PageComponent.stack.indexOf(this) > -1) {
            PageComponent.stack.splice(PageComponent.stack.indexOf(this), 1);
          }
        }
        PageComponent.refreshStack();
        this.cdr.detectChanges();
        if (!this.isMobile) {
          this.desktopPage?.scrollIntoView();
        }
      });
  }


  private setContentPath() {
    this.contentPath = this.route.snapshot.pathFromRoot.map(part => part.url.map(segment => segment.path).join("/")).join("/");
  }


  ngOnDestroy(): void {
    this.screenSizeSubscription?.unsubscribe();
    if (PageComponent.stack.indexOf(this) > -1) {
      PageComponent.stack.splice(PageComponent.stack.indexOf(this), 1);
      PageComponent.refreshStack();
      this.cdr.markForCheck();
    }
  }

  ngAfterContentInit(): void {
    let updateBackButtons = () => {
      this.backButtons?.forEach((button) => {
        button.parentPath = this.parentPage?.contentPath;
      });
    };
    updateBackButtons();
    this.backButtons?.changes.subscribe(() => {
      updateBackButtons();
    });

    let updatePaths = () => {
      this.paths?.forEach((path) => {
        path.page = this;
      });
    };
    updatePaths();
    this.paths?.changes.subscribe(() => {
      updatePaths();
    });

    let updateWidthButtons = () => {
      this.widthButtons?.forEach(path => {
        path.page = this;
      });
    };
    updateWidthButtons();
    this.widthButtons?.changes.subscribe(() => {
      updateWidthButtons();
    });

  }


}
