import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'umn-page-six',
  template: `


    <umn-nav-page #navPage>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-button (click)="navPage.pop()">{{navPage.canGoBack() ? 'Baec' : 'Klous'}} </ion-button>
            <ion-button (click)="navPage.toggleWidth(); this.navPage.scrollIntoView()">SizePlus</ion-button>
          </ion-buttons>
          <umn-back-button></umn-back-button>
          <ion-title>Page {{page}}</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <div class="ion-padding">
        </div>

        <ion-list [inset]="true">
          <ion-item (click)="navPage.push(page)"
                    routerLink="{{navPage.navRoute.basePath+'/'+page}}"
                    routerLinkActive="active" detail="true" button>
            <ion-label>Page {{page}}</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </umn-nav-page>

  `,
})
export class PageSixComponent implements OnInit {
  page: any = 'seven';

  constructor() { }

  ngOnInit(): void {
  }

}
