import { Component } from "@angular/core";

@Component({
  selector: "app-aeydio",
  template: `
<umn-page emptyComponentClassName="EmptyComponent">
  <ion-header>
    <ion-toolbar>
      <ion-buttons>
        <umn-back></umn-back>
      </ion-buttons>
      <ion-title>
        Aey
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    Hi I am Aeydio

    <ion-item routerLink="/home/play-now/seydio"
              routerLinkActive="active"
              queryParamsHandling="merge">
      Play Now
    </ion-item>
  </ion-content>
</umn-page>
  `
})
export class AeydioComponent {

}
