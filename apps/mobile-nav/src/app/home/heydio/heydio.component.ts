import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from "@angular/core";

@Component({
  selector: "app-heydio",
  template: `


    <umn-page>
      <ion-header [translucent]="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <umn-back></umn-back>
          </ion-buttons>
          <ion-buttons slot="start">
            <umn-page-width-button [showLabel]="true"></umn-page-width-button>
          </ion-buttons>
          <ion-title>
            Heydio
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content [fullscreen]="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">
              Heydio
            </ion-title>
          </ion-toolbar>
        </ion-header>
        Hi I am Heydio
        <ion-item path="deydio">
          Deydio
        </ion-item>

        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum</ion-item>
        <ion-item>lorem ipsum ;ast</ion-item>
      </ion-content>
    </umn-page>

  `,
  styles: [
    `
        .active {
            --color: var(--ion-color-primary);
        }
    `
  ]
})
export class HeydioComponent {

}
