import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-update-heydio",
  template: `


    <umn-page>
      <ion-header [translucent]="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <umn-back label="Cancel"></umn-back>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button size="large" routerLink="../" 
                        [queryParams]="{savedHeydieName: input.value}"
                        queryParamsHandling="merge">
              <ion-label>Save</ion-label>
            </ion-button>
          </ion-buttons>
          <ion-title>
            Update Heydio
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content [fullscreen]="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">
              Update {{name}}
            </ion-title>
          </ion-toolbar>
        </ion-header>
        
        <ion-list [inset]="true" mode="md">
          <ion-item >
            <ion-label position="stacked">Name</ion-label>
            <ion-input #input placeholder="Enter your name" [(ngModel)]="name"></ion-input>
          </ion-item>
        </ion-list>
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
export class UpdateHeydioComponent  implements AfterViewInit{

  name = ""


  constructor(private router: Router) {
  }

  ngAfterViewInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        //this is called anytime there is change in the url
        //get query params
        const queryParams = this.router.parseUrl(this.router.url).queryParams;
        console.log(queryParams)


        if(queryParams["updateHeydieName"]){
this.name = queryParams["updateHeydieName"]
          this.router.navigate([], {queryParams: {updateHeydieName: null}, queryParamsHandling: 'merge'})
        }



      });
  }
}
