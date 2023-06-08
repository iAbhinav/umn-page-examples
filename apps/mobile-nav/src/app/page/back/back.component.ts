import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { IonBackButton } from "@ionic/angular";

@Component({
  selector: "umn-back",
  templateUrl: "./back.component.html",
  styleUrls: ["./back.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackComponent implements AfterViewInit {

  @Input() label: any = "Back";
  @Input() icon: any = "chevron-back";
  /**
   * Since, Ionic does not provide a back button on window reload
   * I have to use a custom back button
   * To behave exactly as ionic either use ionic-back-button
   * or set @{showOnPageReload} to false
   */
  @Input() showOnPageReload = true;
  /**
   * There is a tradeoff that I had to do between `ionic-router-outlet` and `router-outlet`
   *
   * `ionic-router-outlet`
   * * [v] provides animations and gestures
   * * [v] show the back button
   * * [x] does not close the page on back button
   *
   * `router-outlet`
   * * [x] provides animations and gestures
   * * [x] show the back button
   * * [v] does close the page on back button
   */
  // @Input() reloadWindowOnCustomBack = false;



  @ViewChild("backButton", {static: false, read: IonBackButton}) backButton?: IonBackButton;

  parentPath? = "../";
  ionBackVisible: boolean = false;


  constructor(private cdr: ChangeDetectorRef,) {
  }

  ngAfterViewInit() {
    const ionBackButton = document.querySelector("ion-back-button");
    // @ts-ignore
    var icon = ionBackButton?.shadowRoot?.querySelector("button > span > ion-icon");
    this.ionBackVisible = icon != undefined;
    this.cdr.detectChanges();
  }

  backClicked() {
    let currentPath = window.location.href;
    setTimeout(() => {
      if(currentPath == window.location.href) {
        console.log("back clicked: Through ion-back-button");
        //click back button
        // @ts-ignore
        this.backButton?.el?.click();
        setTimeout(() => {
          window.location.reload();
        }, 50);
      }
    }, 100);

    // if (this.ionBackVisible) {
    //  // if the back button could not change location in a few ms
    //   //then use the custom back button
    //   let currentPath = window.location.href;
    //   console.log(currentPath)
    //
    // } else {
    //   console.log("back clicked: Through custom Close button");
    //   if(this.reloadWindowOnCustomBack){
    //     setTimeout(() => {
    //       window.location.reload();
    //     });
    //   }
    //   //either add
    //   // {
    //   //   path: '',
    //   //     loadChildren: ()=> import('./../empty/empty.module').then(m=>m.EmptyModule)
    //   // },
    //   // all siblings for this to work fine or
    //   // use this hack
    //   //maybe create a boolean with allows user to choose between the two
    //   //ion-router-outlet wont allow you to navigate to the same route
    //   //and router-outlet wont give you animations and gestures that ionic has for a page
    //   //
    // }


  }
}
