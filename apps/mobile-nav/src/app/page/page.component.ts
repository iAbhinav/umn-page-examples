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
  QueryList,
  ViewChild
} from "@angular/core";
import { IonRouterOutlet } from "@ionic/angular";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { DisplayService, rootAnimation } from "@umun-tech/core";
import { filter } from "rxjs/operators";
import { LocationStrategy } from "@angular/common";
import { BackComponent } from "./back/back.component";

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

  static rootPagePath?: string;
  static stack: PageComponent[] = [];

  @ContentChildren(BackComponent, { descendants: true }) backButtons?: QueryList<BackComponent>;
  @HostBinding("class.ion-page") ionPageClass = true;
  @ViewChild("outlet", { static: false, read: IonRouterOutlet }) ionRouterOutlet?: IonRouterOutlet;


  isRootPage = false;
  showOutlet = false;
  isMobile = this.display.isSmall;

  /* contentPath does not end with '/'
   * to create a child path add / to the end of the parent path
   */
  contentPath: string = "";
  routerColWidth = 400;
  private pathIndex: any;

  parentPath: string | undefined;
  parentPage: PageComponent | undefined;

  private doRootPageThings() {
    // PageComponent.stack = []
    PageComponent.rootPagePath = this.path;
  }

  constructor(private router: Router, private display: DisplayService,
              private route: ActivatedRoute, private locationStrategy: LocationStrategy,
              private cdr: ChangeDetectorRef) {
    this.setContentPath();
    route.url.subscribe(() => {
      this.path = route?.snapshot?.parent?.routeConfig?.path;
      // @ts-ignore
      this.pathIndex = route?.snapshot?._lastPathIndex;

      if (this.pathIndex === 1) {
        this.isRootPage = true;
        this.doRootPageThings();

      }
      this.setShowOutlet();
      this.setContentPath()
      PageComponent.stack.push(this);
      PageComponent.refreshStack();

      this.cdr.detectChanges();

    });

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

        //only to be done in mobile
        this.doRootPageThings();
        PageComponent.refreshStack();
        this.setShowOutlet();
        this.cdr.detectChanges();


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
    PageComponent.stack.splice(PageComponent.stack.indexOf(this));
    PageComponent.refreshStack();
  }

  ngAfterContentInit(): void {
    this.backButtons?.forEach((button) => {
      button.parentPath = this.parentPage?.contentPath;
    });
  }
}
