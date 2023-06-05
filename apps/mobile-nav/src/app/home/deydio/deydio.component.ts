import { AfterViewInit, Component, ElementRef } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-deydio",
  template: `
<umn-page #page>
  <ion-header>
    <ion-toolbar>
      <ion-buttons>
        <umn-back></umn-back>
      </ion-buttons>
      <ion-title>
        Dey
      </ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    Hi I am deydio

    <ion-item [routerLink]="page.parentPath+ '/deydio'" routerLinkActive="active"

              queryParamsHandling="merge">
      Deydio
    </ion-item>
  </ion-content>
</umn-page>
  `
})
export class DeydioComponent implements AfterViewInit {
  backVisible: boolean= false;

  constructor(private router: Router) { }

  refreshPage() {
    // Assuming you are on a route with path '/current-route'

  }

  ngAfterViewInit() {
    // var shadowRoot = this.elementRef.nativeElement.shadowRoot;
    // var icon = shadowRoot.querySelector("icon-icon")
    // console.log(icon)

    const ionBackButton = document.querySelector('ion-back-button');
    // @ts-ignore
    var icon = ionBackButton.shadowRoot.querySelector('button > span > ion-icon');
    this.backVisible = icon != undefined;
  }

  backClicked() {
    if(this.backVisible){
      console.log("back clicked: Through ionic back button", )
    } else {
      console.log("back clicked: Through custom Close button", )

      //either add
      // {
      //   path: '',
      //     loadChildren: ()=> import('./../empty/empty.module').then(m=>m.EmptyModule)
      // },
      // all siblings for this to work fine or
      // use this hack
      //maybe create a boolean with allows user to choose between the two
      //ion-router-outlet wont allow you to navigate to the same route
      //and router-outlet wont give you animations and gestures that ionic has for a page
      setTimeout(() => {
        window.location.reload();
      } )
    }


  }
}
