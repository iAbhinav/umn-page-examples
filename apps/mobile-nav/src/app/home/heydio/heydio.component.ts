import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-heydio",
  template: `


    <umn-page>
      <ion-header [translucent]="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <umn-back label="Play Now"></umn-back>
          </ion-buttons>
          <ion-buttons slot="end">
            <umn-page-width-button></umn-page-width-button>
            <ion-button path="create">
              <ion-icon slot="icon-only" name="create-outline"></ion-icon>
            </ion-button>
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
        

        <ion-item *ngFor="let name of names; let i = index" path="update" [params]="{updateHeydieName:name}">
          <ion-label>{{name}}</ion-label>
          <ion-buttons slot="end">
            <ion-button (click)="names.splice(i, 1)">
              <ion-icon slot="icon-only" size="small" name="trash-outline"></ion-icon>
            </ion-button>
          </ion-buttons>
        </ion-item>
      </ion-content>
      <ion-footer>
       <ion-toolbar>
        <ion-buttons>
          <ion-button path="deydio">
            Deydio
          </ion-button>
        </ion-buttons>
       </ion-toolbar>
      </ion-footer>
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
export class HeydioComponent implements AfterViewInit{

  // array of 10 random names
  names = ['John', 'Paul', 'George', 'Ringo', 'Bob', 'Joe', 'Bill', 'Ted', 'Frank', 'Jim',
  'John', 'Paul', 'George', 'Ringo', 'Bob', 'Joe', 'Bill', 'Ted', 'Frank', 'Jim End'];

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

        if(queryParams["savedHeydieName"]){
          console.log("Heydio Saved", queryParams["savedHeydieName"])
          //add at top of list
          this.names.unshift(queryParams["savedHeydieName"])

          //remove the query param
          this.router.navigate([], {queryParams: {savedHeydieName: null}, queryParamsHandling: 'merge'})
        }



      });
  }
}
