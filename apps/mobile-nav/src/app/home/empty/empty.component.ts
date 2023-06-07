import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { fadeInOut } from "../../page/animations/page.animations";
import { PageHelper } from "../../page/services/page-helper.service";

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
