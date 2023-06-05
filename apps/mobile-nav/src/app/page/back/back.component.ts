import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation
} from "@angular/core";

@Component({
  selector: 'umn-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackComponent implements AfterViewInit {


  backVisible: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {
  }
  ngAfterViewInit() {

    const ionBackButton = document.querySelector("ion-back-button");
    // @ts-ignore
    var icon = ionBackButton.shadowRoot.querySelector("button > span > ion-icon");
    this.backVisible = icon != undefined;
this.cdr.detectChanges()
  }

  backClicked() {
    if (this.backVisible) {
      console.log("back clicked: Through ionic back button");
    } else {
      console.log("back clicked: Through custom Close button");

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
      });
    }


  }
}
