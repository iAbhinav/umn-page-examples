import { Component } from "@angular/core";

@Component({
  selector: "app-seydio",
  template: `
    <umn-page>
      <ion-header>
        <ion-toolbar>
          <ion-buttons>
            <umn-back></umn-back>
          </ion-buttons>
          <ion-title>
            sey
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        Hi I am seydio

        <ion-item path="deydio" color="grey" activeColor="green">
          Deydio
        </ion-item>
        <ion-item path="aeydio" color="grey" activeColor="green">
          Aeydio
        </ion-item>
      </ion-content>
    </umn-page>
  `
})
export class SeydioComponent {

}
