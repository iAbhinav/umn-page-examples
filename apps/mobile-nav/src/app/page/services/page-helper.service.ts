import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class PageHelper {

  constructor(private platform: Platform) {
  }

  get isMobile() {
    return this.isSmall
  }

  get isTablet() {
    return this.isMedium
  }

  get isDesktop() {
    return this.isLarge || this.isXtraLarge || this.isXXtraLarge
  }


  get isSmall() {
    return this.platform.width() <= 768;
  }
  get isMedium() {
    return this.platform.width() > 768;
  }
  get isLargeDown() {
    return this.platform.width() < 992;
  }
  get isLarge() {
    return this.platform.width() >= 992;
  }
  get isXtraLarge() {
    return this.platform.width() >= 1200;
  }
  get isXXtraLarge() {
    return this.platform.width() >= 1400;
  }
  get isTouchDevice() {
    return !this.platform.is('desktop') && !this.platform.is('electron')
  }
}
