import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  HostListener,
  QueryList,
  ViewEncapsulation
} from "@angular/core";
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { NavBarItemComponent } from "../nav-bar-item/nav-bar-item.component";
import { PageHelper } from "../page/services/page-helper.service";

@Component({
  selector: "umn-portal",
  templateUrl: "./portal.component.html",
  styleUrls: ["./portal.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortalComponent implements AfterContentInit {
  @ContentChild(NavBarComponent) navBar?: NavBarComponent;
  @ContentChildren(NavBarItemComponent, { descendants: true }) navItems?: QueryList<NavBarItemComponent>;
  isMobile?: boolean;
  isDesktop?: boolean;

  constructor(private pageHelper: PageHelper,
              private cdr: ChangeDetectorRef) {

  }

  @HostListener('window:resize', ['$event'])
  onScreenSizeChange() {
    this.isMobile = this.pageHelper.isMobile;
    this.isDesktop = !this.isMobile
    this.cdr.detectChanges()
  }

  ngAfterContentInit() {
    this.onScreenSizeChange()
    if (this.navItems)
      this.navItems.forEach(navItem => {
        if(navItem){
          navItem.portal = this;
        }
      });
  }
}
