import { ChangeDetectorRef, Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from "@angular/core";
import { PageComponent } from "../page.component";
import { Params, QueryParamsHandling } from "@angular/router";

@Directive({
  selector: "[path]"
})
export class PathDirective {

  @Input("path") path?: string;
  @Input("params") params?: Params | null;
  @Input("paramsHandling") paramsHandling?: QueryParamsHandling = "merge";
  @Input("color") fontColor?: string = "";
  @Input("activeColor") activeColor?: string = "var(--ion-color-primary)";

  page?: PageComponent;
  @HostBinding("style.color") get color() {
    if(this.page){
      let wantsToOpenContentPath = this.page?.contentPath+"/"+this.path+"/"
      for (const page of this.page.stack) {
        if(page.contentPath == wantsToOpenContentPath) {
          //do nothing since the page is already in stack
          this.cdr.markForCheck();
          return this.activeColor;
        }
      }
    }
    this.cdr.markForCheck();
    return this.fontColor;
  };

  constructor(private cdr: ChangeDetectorRef,private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setAttribute(this.el.nativeElement, 'button', '');
  }

  @HostListener("click", ["$event"])
  onClick(event: any) {
    this.page?.push(this.path, this.params, this.paramsHandling)?.catch(e=>{
      //do nothing here
    })
  }

}
