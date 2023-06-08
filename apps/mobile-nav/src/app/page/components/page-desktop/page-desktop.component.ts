import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter, HostBinding,
  Input, Output,
  ViewChild
} from "@angular/core";
import { IonRouterOutlet } from "@ionic/angular";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { PageHelper } from "../../services/page-helper.service";
import { PageComponent } from "../../page.component";
import { fadeInOut } from "../../animations/page.animations";

@Component({
  selector: "umn-page-desktop",
  template: `
    <div class="desktop row ion-nowrap" [class.top-row]="isRootPage" [@fadeInOut]>
      <ion-col class=" content" [class.root]="isRootPage"
               [style.--content-width-desktop]="contentWidthDesktop + widthUnit">
        <div class="ion-page" [class.can-go-back]="true">
          <ng-content></ng-content>
        </div>
      </ion-col>
      <ion-col class="outlet">
        <ion-router-outlet #outlet [style.min-width]="routerOutletWidth+'px'"></ion-router-outlet>
      </ion-col>
    </div>
  `,
  styleUrls: ["./page-desktop.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInOut
  ]
})
export class PageDesktopComponent implements AfterViewInit, AfterContentInit {

  @Output() contentWidthDesktopChange = new EventEmitter<number>();

  @Input() contentWidthDesktopExpanded = 600;
  @Input() widthUnit = "px";
  @Input() isRootPage = false;

  @Input() set contentWidthDesktop(value: any) {
    if(!value){
      return
    }
    this._contentWidthDesktop = value;
    if (!this.initialContentWidth) {
      this.initialContentWidth = value;
    }
    PageComponent.refreshStack();
    this.cdr.detectChanges();
  }

  get contentWidthDesktop() {
    return this._contentWidthDesktop;
  }



  initialContentWidth = 0;
  routerOutletWidth = 400;

  @HostBinding("style.height") height = "100%";
  private _contentWidthDesktop: number = 400;


  constructor(private cdr: ChangeDetectorRef) {
  }

  scrollIntoView() {
    setTimeout(() => {
      const parentElement = document.querySelector(".top-row") as HTMLElement;
      if (parentElement) {

        parentElement.scrollLeft = parentElement.scrollWidth; // Set initial scroll position to the rightmost side.
        const scrollAmount = parentElement.scrollWidth - parentElement.clientWidth;
        let animationDuration: number = 700; //IMPORTANT:animationDuration should be more than the time of fadeAnimation which is 500ms
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
  ngAfterViewInit(): void {

  }

  ngAfterContentInit(): void {
    if (!this.initialContentWidth) {
      this.initialContentWidth = this.contentWidthDesktop;
    }
  }


}
