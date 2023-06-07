import { ChangeDetectorRef, Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from "@angular/core";
import { PageComponent } from "../page.component";

@Directive({
  selector: "[path]"
})
export class PathDirective {

  @Input("path") path?: string;

  @HostBinding("style.color") get color() {
    let wantsToOpenContentPath = this.page?.contentPath+"/"+this.path+"/"
    for (const page of PageComponent.stack) {
      if(page.contentPath == wantsToOpenContentPath) {
        //do nothing since the page is already in stack
        return "var(--ion-color-primary)";
      }
    }
    return "";
  };



  page?: PageComponent;

  constructor(private cdr: ChangeDetectorRef,private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setAttribute(this.el.nativeElement, 'button', '');
  }

  @HostListener("click", ["$event"])
  onClick(event: any) {
    this.page?.push(this.path)?.catch(e=>{
      //do nothing here
    })
  }

}
