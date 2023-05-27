import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'umn-page-two',
  templateUrl: 'page-two.component.html',
  styleUrls: ['page-two.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTwoComponent implements OnInit {
  page3 = "pageThree"

  constructor(private cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  doSomething() {
    this.cdr.detectChanges();
  }
}
