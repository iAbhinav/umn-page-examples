import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-playnow",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `


    <umn-page #page [contentWidthDesktop]="400" widthUnit="px" [contentWidthDesktopExpanded]="600">
      <ion-header>
        <ion-toolbar>
          <ion-buttons>
            <umn-page-width-button></umn-page-width-button>
            <!--            <umn-back [showCustomBack]="false"></umn-back>-->
          </ion-buttons>
          <ion-title>
            Play Now
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        Hi I am PlayNow
        <ion-item path="heydio/10" [params]="{heydioId: 10001}">
          Heydio
        </ion-item>

        <ion-item path="seydio">
          Seydio
        </ion-item>

      </ion-content>
      <ion-footer *ngIf="!page?.isMobile" class="umn-page-footer">
        <ion-toolbar>
          <ion-breadcrumbs slot="start">
            <ion-breadcrumb *ngFor="let p of page?.stack"
                            (click)="p.navigateToThisPage()">{{p?.label}}</ion-breadcrumb>
          </ion-breadcrumbs>
          <ion-buttons slot="end">
            <ion-badge color="medium" mode="md">Stack: {{page?.stack?.length}}</ion-badge>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    </umn-page>
  `,
  styles: [
    `
        umn-page {
            display: flex;
            /*--row-overflow-x: none;*/
            /*--content-width-desktop: 100%;*/
        }
        .active {
            --color: var(--ion-color-primary);
        }
    `
  ]
})
export class PlayNowComponent {



  }
