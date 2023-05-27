import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, Input,
  OnInit,
  Renderer2, ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { AnimationController, IonRouterOutlet, NavController } from "@ionic/angular";
import { DisplayService, rootAnimation } from "@umun-tech/core";
import { animate, style, transition, trigger } from "@angular/animations";
import { enterLeftToRight } from "./animations";


@Component({
  selector: "umn-nav-page",
  templateUrl: "nav-page.component.html",
  styleUrls: ["nav-page.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    enterLeftToRight,
    rootAnimation
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
  id: string;

  constructor(private renderer: Renderer2, private el: ElementRef,
              private cdr: ChangeDetectorRef,
              private router: Router,
              private display: DisplayService,
              private navController: NavController,
              private animationCtrl: AnimationController) {
    //random string
    this.id = Math.random().toString(36).substring(7);
    console.log(this.id)

  }

  ngAfterViewInit(): void {
    this.scrollIntoView(100);


    }


  ngOnInit(): void {
//on url change
    if(this.isRootPage) {
      this.router.events.subscribe((val) => {

        this.breadCrumbs = this.router.url.split("/").filter(x => x !== "");
        // console.log(this.router.url, this.breadCrumbs)

      })
    }
  }


  push(path: string, routerColWidth: string = "0px") {
    this.navController.navigateForward(path).then(res => {
      this.routerColWidth = routerColWidth;
     this.scrollIntoView(700);

    });

  }

  pop(path) {
    this.navController.navigateBack(path);
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
    this.isShowBackButton = !this.isShowBackButton
  }

   scrollIntoView(animationDuration: number = 700) {
    setTimeout(() => {

      const parentElement = document.querySelector('.top-row') as HTMLElement;
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
    })
  }
}
