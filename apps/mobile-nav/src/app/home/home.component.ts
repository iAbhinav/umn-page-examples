import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home",
  template: `
    <umn-portal>
      <umn-nav-bar>
        <umn-nav-bar-item label="Play Now"
                          path="play-now" icon="play-circle">
        </umn-nav-bar-item>
        <umn-nav-bar-item label="Radio" path="radio" icon="radio">
        </umn-nav-bar-item>
      </umn-nav-bar>
    
    </umn-portal>
   
  `
  ,
  styleUrls: [`./home.component.scss`]
})
export class HomeComponent {
  parentPath?: string;

  constructor(private route: ActivatedRoute) {
    // This assumes that HomeComponent is directly a child of the root router
    // Modify as needed if HomeComponent is deeper in your routing hierarchy
    this.parentPath = this.route.snapshot.pathFromRoot.map(part => part.url.map(segment => segment.path).join('/')).join('/');
  }
}
