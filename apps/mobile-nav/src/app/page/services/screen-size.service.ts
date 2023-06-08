import { Injectable, NgZone } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  private _screenSizeChange = new Subject<any>();

  screenSizeChange$ = this._screenSizeChange.asObservable();

  constructor(private ngZone: NgZone) {
    ngZone.runOutsideAngular(() => {
      window.addEventListener("resize", () => {
        this._screenSizeChange.next();
      });
    })
  }

}
