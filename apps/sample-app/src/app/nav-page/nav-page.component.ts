import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AnimationController, NavController } from "@ionic/angular";
import { DisplayService, rootAnimation } from "@umun-tech/core";
import { contentWidthAnimation, enterLeftToRight } from "./animations";


@Component({
  selector: "umn-nav-page",
  templateUrl: "nav-page.component.html",
  styleUrls: ["nav-page.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    enterLeftToRight,
    rootAnimation,
    contentWidthAnimation
  ]
})
export class NavPage implements OnInit, AfterViewInit {

  routerColWidth = "0px";
  @Input() background = "";
  @Input() isRootPage = false;
  @ViewChild("containerRow", { read: ElementRef, static: false }) containerRow: ElementRef;
  // @ViewChild("routerOutlet", { read: IonRouterOutlet, static: false }) routerOutlet: IonRouterOutlet;
  contentColWidth = "400px";

  isShowBackButton = false;
  breadCrumbs: string[];
  basePath: string = "";
  parentPath: string;
  private path: any;

  constructor(private renderer: Renderer2, private el: ElementRef,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private display: DisplayService,
              private navController: NavController,
              private animationCtrl: AnimationController,
              private route: ActivatedRoute) {


  }

  ngAfterViewInit(): void {
    this.scrollIntoView();

  }


  ngOnInit(): void {
    this.setBasePath();
//on url change
    if (this.isRootPage) {
      this.router.events.subscribe((val) => {

        this.breadCrumbs = this.router.url.split("/").filter(x => x !== "");
        // console.log(this.router.url, this.breadCrumbs)

      });
    }
  }


  push(path: string, routerColWidth: string = "0px") {
    this.setBasePath()
    console.log(this.basePath +"/"+ path);
    this.navController.navigateForward(this.basePath +"/"+ path).then(res => {
      this.routerColWidth = routerColWidth;
      this.scrollIntoView();

    });


  }

  pop(path) {
    this.navController.navigateBack(this.parentPath);
    // this.umunNavController.pop(this.path)
    this.cdr.detectChanges();
  }

  toggleWidth() {
    if (this.contentColWidth === "400px") {
      this.contentColWidth = "800px";
      this.scrollIntoView();
    } else {
      this.contentColWidth = "400px";
    }
    this.cdr.detectChanges();
  }

  private toggleBackButton() {
    this.isShowBackButton = !this.isShowBackButton;
  }

  scrollIntoView() {
    let animationDuration: number = 250;
    setTimeout(() => {

      const parentElement = document.querySelector(".top-row") as HTMLElement;
      if (parentElement) {
        const scrollAmount = parentElement.scrollWidth - parentElement.clientWidth;
        const startTime = performance.now();
        const duration = animationDuration; // Animation duration in milliseconds

        function scrollAnimation(timestamp: number) {
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = easeOutQuad(progress);
          parentElement.scrollLeft = scrollAmount * ease;

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

  private setBasePath() {
    if (!this.route?.snapshot?.data?.path) {

      throw new Error(`NavPageComponent: path is not defined in route data
      example:
      {
        path: "pageOne",
        component: PageOneComponent,
        data: {
          path: "pageOne"
          }`);
    }

    this.path = this.route?.snapshot?.data?.path;
    this.basePath = this.router.url.substr(0, this.router.url.indexOf(this.route?.snapshot?.data?.path) + this.route?.snapshot?.data?.path?.length);
    this.parentPath = this.router.url.substr(0, this.router.url.indexOf(this.route?.snapshot?.data?.path) - 1);

    console.log("Set base base", this.path, this.basePath, this.parentPath)

    // let parent = this.umunNavController.push({
    //   path: this.path,
    //   basePath: this.basePath,
    //   isRoot: this.isRootPage,
    //   navPage: null,
    //   parentPath: this.parentPath,
    //   children: []
    // })
    // console.log("parent", parent)
    this.cdr.detectChanges();
  }
}
