import { Component } from "@angular/core";

@Component({
  selector: "app-beydio",
  template: `
    <umn-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons>
            <umn-back></umn-back>
          </ion-buttons>
          <ion-title>
            Bey
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        Hi I am Beydio

        <ion-item  path='aeydio' [params]="{aId:3864834304}">
          Aeydio
        </ion-item>
      </ion-content>
    </umn-page>
  `
})
export class BeydioComponent {

}
