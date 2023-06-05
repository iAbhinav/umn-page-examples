import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { DisplayService } from "@umun-tech/core";

@Component({
  selector: "app-empty",
  template: `
   <ion-content *ngIf="!isMobile">
     So Empty Here 💎
   </ion-content>
  `
})
export class EmptyComponent {
  isMobile = this.display.isSmall;
  constructor(private router: Router, private display: DisplayService) {}
}
