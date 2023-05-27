import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'umn-page-three',
  templateUrl: 'page-three.component.html',
  styleUrls: ['page-three.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageThreeComponent implements OnInit {
  page3: any = 'nav-page';

  constructor() { }

  ngOnInit(): void {
  }

}
