import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { PortalComponent } from "../portal/portal.component";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'umn-nav-bar-item',
  templateUrl: './nav-bar-item.component.html',
  styleUrls: ['./nav-bar-item.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarItemComponent implements OnInit {

  @Input() label?: string;
  @Input() path?: string;
  @Input() icon?: string;
  @Input() params?: Params;

  private _portal: PortalComponent | undefined;

  /**
   * The child route of the parent portal that this nav bar item should activate
   * parentPath + path
   */
  childRoute?: string;

  parentPath?: string;


  get portal(): PortalComponent | undefined {
    return this._portal;
  }

  set portal(portal: PortalComponent | undefined) {
    this._portal = portal;
    if(portal && this.parentPath) {
      this.childRoute = this.parentPath + this.path;
      console.log(this.childRoute)
    }
  }

  constructor(private route: ActivatedRoute) {
    // This assumes that HomeComponent is directly a child of the root router
    // Modify as needed if HomeComponent is deeper in your routing hierarchy
    this.parentPath = this.route.snapshot.pathFromRoot.map(part => part.url.map(segment => segment.path).join('/')).join('/');
  }

  ngOnInit(): void {
  }

}
