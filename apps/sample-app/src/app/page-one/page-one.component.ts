import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation
} from "@angular/core";
import { NavigationEnd, Router, Routes } from "@angular/router";
import { filter } from "rxjs/operators";
import { PageTwoComponent } from "../page-two/page-two.component";


@Component({
  selector: 'umn-page-one',
  templateUrl: 'page-one.component.html',
  styleUrls: ['page-one.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageOneComponent implements OnInit, AfterViewInit {
  // page1: any = "/portal-35/pageOne/pageOne";
  page2 = "pageTwo"
  longArray = Array.from({length: 20}, (_, i) => i);
  constructor(private cdr:ChangeDetectorRef) { }

  doSomething() {
    this.cdr.detectChanges();
  }
  ngOnInit(): void {
    // console.log(pageOneRoutes)
  }

  ngAfterViewInit(): void {


  }

}

export const pageOneRoutes: Routes = [
  {
    path: "",
    component: PageOneComponent,
    children: [
      // {
      //   path: "pageOne",
      //   component: PageOneComponent
      // },
      {
        path: "pageTwo",
        loadChildren: () => import("../page-two/page-two.module").then(m => m.PageTwoModule),
        data: {
          path: "pageTwo"
        }
      },
    ]
  }
]
