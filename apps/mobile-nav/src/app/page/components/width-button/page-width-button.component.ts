import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";
import { PageHelper } from "../../services/page-helper.service";
import { PageComponent } from "../../page.component";

@Component({
  selector: "umn-page-width-button",
  templateUrl: "./page-width-button.component.html",
  styleUrls: ["./page-width-button.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageWidthButtonComponent {

  @Input() expandIcon = "expand-outline";
  @Input() contractIcon = "contract-outline";
  @Input() contractLabel = "Contract";
  @Input() expandLabel = "Expand";
  @Input()  set showLabel(value: boolean) {
    this._showLabel = value;
    if(this._showLabel){
      this.slot ="start";
    } else {
      this.slot = "icon-only";
    }
  }

  isVisible: boolean;
  get showLabel(): boolean {
    return this._showLabel;
  }
  label = this.expandLabel;
  /**
   * Automatically set by Umun Page
   */
  page?: PageComponent;
  icon = "expand-outline";
  slot = "icon-only";
  private _showLabel = false;

  constructor(private pageHelper: PageHelper) {
    this.isVisible = !this.pageHelper.isMobile;
  }

  toggle() {
    if(!this.page){
      console.warn("page-width-button should only be used inside of a umn-page component");
      return;
    }
    if(this.page?.contentWidthDesktop === this.page.contentWidthDesktopExpanded) {
      if(this.page.desktopPage?.initialContentWidth){
        this.page.contentWidthDesktop = this.page.desktopPage.initialContentWidth;
      }
      this.label = this.expandLabel;
      this.icon = this.expandIcon;
    } else {
      this.page.contentWidthDesktop = this.page.contentWidthDesktopExpanded;
      this.label = this.contractLabel;
      this.icon = this.contractIcon;
    }
  }
}
