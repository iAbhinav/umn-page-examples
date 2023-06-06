import { Component } from "@angular/core";

@Component({
  selector: "app-seydio",
  template: `
    <umn-page #page>
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

        <ion-item [routerLink]="page.contentPath+ '/deydio'" routerLinkActive="active"

                  queryParamsHandling="merge">
          Deydio
        </ion-item>
      </ion-content>
    </umn-page>
  `
})
export class SeydioComponent {

}
