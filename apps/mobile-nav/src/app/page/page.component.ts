import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, HostBinding,
  HostListener,
  Input,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { IonRouterOutlet, NavController } from "@ionic/angular";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { DisplayService } from "@umun-tech/core";
import { filter } from "rxjs/operators";
import { LocationStrategy } from "@angular/common";

@Component({
  selector: "umn-page",
  templateUrl: "./page.component.html",
  styleUrls: ["./page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements AfterViewInit {

  @HostBinding("class.ion-page") ionPageClass = true;
  canGoBackClass = true;

  @Input() isRootPage = false;
  @ViewChild("outlet", { static: false, read: IonRouterOutlet }) ionRouterOutlet?: IonRouterOutlet;
  showOutlet = false;
  isMobile = this.display.isSmall;

  /* ParentPath does not end with '/'
   * to create a child path add / to the end of the parent path
   */
  parentPath?: string;


  constructor(private router: Router, private display: DisplayService,
              private route: ActivatedRoute,private locationStrategy: LocationStrategy,
              private cdr: ChangeDetectorRef) {
    this.setParentPath();

    setInterval(()=>{
      this.canGoBackClass = true
      this.cdr.detectChanges()
    }, 1000)
  }

  canGoBack(): boolean {
    // @ts-ignore
    const history = this.locationStrategy._platformStrategy.history;
    console.log(history.state )
    return history.state && history.state.navigationId > 1;
  }

  @HostListener("window:resize", ["$event"])
  onScreenSizeChange() {
    this.isMobile = this.display.isSmall;
    this.setParentPath();
    this.setOutletSize();
    this.cdr.detectChanges();
  }




  ngAfterViewInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.setOutletSize();

      });

  }

  get outletState() {
    return this.showOutlet ? "in" : "out";
  }

  private setOutletSize() {
    try {
      // navigation has ended, you could trigger any necessary actions here
      console.log("Navigation ended:", event);
      console.log(this.ionRouterOutlet?.component.constructor.name);
      this.showOutlet = this.ionRouterOutlet?.component?.constructor?.name != undefined
        && this.ionRouterOutlet?.component?.constructor?.name != "EmptyComponent";

      console.log("Show outlet", this.showOutlet);


      this.cdr.detectChanges();
    } catch (e) {

    }
  }

  private setParentPath() {
    this.parentPath = this.route.snapshot.pathFromRoot.map(part => part.url.map(segment => segment.path).join("/")).join("/");
  }
}
