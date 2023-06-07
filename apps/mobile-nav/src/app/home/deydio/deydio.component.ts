import { AfterViewInit, Component, ElementRef } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-deydio",
  template: `
    <umn-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons>
            <umn-back></umn-back>
          </ion-buttons>
          <ion-title>
            Dey
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        Hi I am deydio

        <ion-item path='xeydio'>
          Xeydio
        </ion-item>
      </ion-content>
    </umn-page>
  `
})
export class DeydioComponent {

}
