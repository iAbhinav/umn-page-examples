import {
  AfterContentInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChild, ContentChildren, HostListener,
  OnInit, QueryList,
  ViewEncapsulation
} from "@angular/core";
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { NavBarItemComponent } from "../nav-bar-item/nav-bar-item.component";
import { DisplayService } from "@umun-tech/core";

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
  isTablet?: boolean;
  isDesktop?: boolean;

  constructor(private display: DisplayService,
              private cdr: ChangeDetectorRef) {

  }

  @HostListener('window:resize', ['$event'])
  onScreenSizeChange() {
    this.isMobile = this.display.isSmall;
    this.isTablet = this.display.isMedium && this.display.isTouchDevice;
    this.isDesktop = !this.isMobile || this.isTablet;
    console.log(this.isMobile, this.isDesktop, this.isTablet)
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
