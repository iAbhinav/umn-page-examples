import { Component } from "@angular/core";

@Component({
  selector: "app-xeydio",
  template: `
    <umn-page #page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons>
            <umn-back></umn-back>
          </ion-buttons>
          <ion-title>
            Xey
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        Hi I am Xeydio

        <ion-item path="beydio">
          Beydio
        </ion-item>
      </ion-content>
    </umn-page>
  `
})
export class XeydioComponent {

}
