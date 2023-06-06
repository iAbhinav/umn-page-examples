import { Component } from "@angular/core";

@Component({
  selector: "app-beydio",
  template: `
    <umn-page #page>
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
        Hi I am Beydio

        <ion-item [routerLink]="page.contentPath+ '/aeydio'" routerLinkActive="active"

                  queryParamsHandling="merge">
          Aeydio
        </ion-item>
      </ion-content>
    </umn-page>
  `
})
export class BeydioComponent {

}
