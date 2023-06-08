import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewChild } from "@angular/core";
import { IonRouterOutlet } from "@ionic/angular";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { PageHelper } from "../services/page-helper.service";

@Component({
  selector: "umn-page-mobile",
  template: `
    <ion-row class="mobile row ion-nowrap">
      <div [class.ion-page]="!showOutlet" [class.can-go-back]="true" [hidden]="showOutlet">
        <ng-content></ng-content>
      </div>
      <div [hidden]="!showOutlet">
        <ion-router-outlet #outlet></ion-router-outlet>
      </div>
    </ion-row>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageMobileComponent implements AfterViewInit {

  @Input() emptyComponentClassName = "EmptyComponent";
  @Input() isRootPage = false;

  @ViewChild("outlet", { static: false, read: IonRouterOutlet }) ionRouterOutlet?: IonRouterOutlet;

  showOutlet = false;

  get outletState() {
    return this.showOutlet ? "in" : "out";
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pageHelper: PageHelper,
              private cdr: ChangeDetectorRef) {
    route.url.subscribe(() => {
      // only called when a page is loaded first time
      this.setShowOutlet();
    });

  }

  setShowOutlet() {
    try {
      // navigation has ended, you could trigger any necessary actions here
      this.showOutlet = this.ionRouterOutlet?.component?.constructor?.name != undefined
        && this.ionRouterOutlet?.component?.constructor?.name != this.emptyComponentClassName;
      this.cdr.markForCheck();
    } catch (e) {

    }
  }

  ngAfterViewInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        //this is called anytime there is change in the url
        this.setShowOutlet();
        this.cdr.detectChanges();
      });
  }

}
