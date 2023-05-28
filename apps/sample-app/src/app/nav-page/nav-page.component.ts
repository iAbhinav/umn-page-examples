import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { DisplayService, rootAnimation } from "@umun-tech/core";
import { contentWidthAnimation } from "./animations";
import { UmunNavController } from "./UmunNavController";


@Component({
  selector: "umn-nav-page",
  templateUrl: "nav-page.component.html",
  styleUrls: ["nav-page.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    rootAnimation,
    contentWidthAnimation
  ]
})
export class NavPage implements OnInit, AfterViewInit {

  routerColWidth = "0px";
  @Input() background = "";
  @Input() isRootPage = false;
  @ViewChild("containerRow", { read: ElementRef, static: false }) containerRow: ElementRef;
  @Output() onToggleBackButton = new EventEmitter<boolean>();
  // @ViewChild("routerOutlet", { read: IonRouterOutlet, static: false }) routerOutlet: IonRouterOutlet;
  contentColWidth = "400px";

  isShowBackButton = false;
  breadCrumbs: string[];

  navRoute = {
    path: undefined,
    parentPath: undefined,
    basePath: undefined  //base = parent + path
  }

  constructor(private renderer: Renderer2, private el: ElementRef,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private display: DisplayService,
              private navController: NavController,
              private umunNavContoller: UmunNavController,
              private route: ActivatedRoute) {
  }

  ngAfterViewInit(): void {
    this.scrollIntoView();
    this.setPaths()

    this.isShowBackButton = this.canGoBack()
    this.onToggleBackButton.emit(this.isShowBackButton)
    this.cdr.detectChanges()

  }


  ngOnInit(): void {
//on url change
    if (this.isRootPage) {
      this.router.events.subscribe((val) => {

        this.breadCrumbs = this.router.url.split("/").filter(x => x !== "");
        // console.log(this.router.url, this.breadCrumbs)

      });
    }
  }


  push(path: string, routerColWidth: string = "0px") {
    // this.setPaths()
    this.navController.navigateForward(this.navRoute.basePath+"/"+path).then(res => {
      this.routerColWidth = routerColWidth;
      this.scrollIntoView();

    });

  }

  pop() {
    //popping closes all the other since we are moving to the parentpath
    // this.umunNavContoller.pop(this.path)
    console.log(this.umunNavContoller.getParentRoute(this.navRoute.path))
    let siblings = this.umunNavContoller.pop(this.navRoute.path);

    if(siblings?.length){
      //todo: should open the fartherst child in the hierarchy
      this.navController.navigateBack(siblings[siblings.length-1].basePath)
    } else {
      this.navController.navigateBack(this.navRoute.parentPath)
    }


    // this.navController.navigateBack(this.parentPath);

    this.cdr.detectChanges();
  }

  toggleWidth() {
    if (this.contentColWidth === "400px") {
      this.contentColWidth = "800px";
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

  setPaths() {
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

    this.navRoute.path = this.route?.snapshot?.data?.path;
    this.navRoute.basePath = this.router.url.substr(0, this.router.url.indexOf(this.route?.snapshot?.data?.path) + this.route?.snapshot?.data?.path?.length);
    this.navRoute.parentPath = this.router.url.substr(0, this.router.url.indexOf(this.route?.snapshot?.data?.path) - 1);

    let parent = this.umunNavContoller.push({
      path: this.navRoute.path,
      basePath: this.navRoute.basePath,
      isRoot: this.isRootPage,
      navPage: null,
      parentPath: this.navRoute.parentPath,
      children: []
    })
    this.cdr.detectChanges();
  }

  canGoBack(){
    return this.umunNavContoller.findSiblings(this.navRoute.path)?.length > 0
  }
}
