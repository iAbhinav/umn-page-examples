import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  ViewChild
} from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { IonRouterOutlet } from "@ionic/angular";
import { DisplayService } from "@umun-tech/core";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-playnow",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `


    <umn-page #page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons>
            <umn-back [showCustomBack]="false"></umn-back>
          </ion-buttons>
          <ion-title routerLink="/home/play-now/" routerLinkActive="active">
            Play Now
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        Hi I am PlayNow
<!--        [routerLink]="page.contentPath + '/heydio'"-->
<!--        [queryParams]="{ stationName: 'Heydio'}"-->
        <ion-item  routerLinkActive="active" path="heydio"
                  
                  queryParamsHandling="merge">
          Heydio
        </ion-item>
        <ion-item path="seydio"
                  routerLinkActive="active" queryParamsHandling="merge">
          Seydio
        </ion-item>

      </ion-content>
    </umn-page>
  `,
  styles: [
    `
        umn-page {
            display: flex;
        }
        .active {
            --color: var(--ion-color-primary);
        }
    `
  ]
})
export class PlayNowComponent {

  // @ViewChild("outlet", { static: false, read: IonRouterOutlet }) ionRouterOutlet?: IonRouterOutlet;
  // showOutlet = false;
  // isMobile = this.display.isSmall;
  // parentPath: string;
  //
  // constructor(private router: Router, private display: DisplayService,
  //             private route: ActivatedRoute,
  //             private cdr: ChangeDetectorRef) {
  //   this.parentPath = this.route.snapshot.pathFromRoot.map(part => part.url.map(segment => segment.path).join("/")).join("/");
  // }
  //
  // @HostListener("window:resize", ["$event"])
  // onScreenSizeChange() {
  //   this.isMobile = this.display.isSmall;
  //   this.parentPath = this.route.snapshot.pathFromRoot.map(part => part.url.map(segment => segment.path).join("/")).join("/");
  //   this.setOutletSize();
  //   this.cdr.detectChanges();
  // }
  //
  //
  // ngAfterViewInit(): void {
  //   this.router.events
  //     .pipe(filter((event) => event instanceof NavigationEnd))
  //     .subscribe((event) => {
  //       this.setOutletSize();
  //     });
  //
  // }
  //
  // get outletState() {
  //   return this.showOutlet ? "in" : "out";
  // }
  //
  // private setOutletSize() {
  //   try {
  //     // navigation has ended, you could trigger any necessary actions here
  //     console.log("Navigation ended:", event);
  //     console.log(this.ionRouterOutlet?.component.constructor.name);
  //     this.showOutlet = this.ionRouterOutlet?.component?.constructor?.name != undefined
  //       && this.ionRouterOutlet?.component?.constructor?.name != "EmptyComponent";
  //
  //     console.log("Show outlet", this.showOutlet);
  //   } catch (e) {
  //
  //   }
  // }
}
