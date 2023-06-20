import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { PageHelper } from "@umun-tech/page";
import { fadeInOut } from "@umun-tech/page";

@Component({
  selector: "app-empty",
  animations:[
    fadeInOut
  ],
  template: `
   <ion-content *ngIf="!isMobile" [@fadeInOut]>
   </ion-content>
  `,
  styles:[
    `
      ion-content {
          --background: var(--ion-background-color);
          opacity: 1;
      }`
  ]
})
export class EmptyComponent {
  isMobile = this.pageHelper.isSmall;
  constructor(private router: Router, private pageHelper: PageHelper) {}
}
