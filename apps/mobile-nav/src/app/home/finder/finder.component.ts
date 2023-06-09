import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { PageComponent } from "../../page/page.component";
import { filter } from "rxjs/operators";
import { PageHelper } from "../../page/services/page-helper.service";
import { ExplorerPageComponent } from "./explorer.component";
import { ExplorerController } from "./explorer.controller";

@Component({
  selector: "umn-finder-page",
  template: `
    <umn-page #page  
              [desktopViewType]="type">
      <ion-header *ngIf="pageHelper?.isMobile || type =='full_screen'">
        <ion-toolbar>
          <ion-buttons slot="start">
            <umn-back></umn-back>
          </ion-buttons>
          <ion-title>{{page?.path}}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-progress-bar *ngIf="isLoading"></ion-progress-bar>
        <ion-list *ngIf="!pageHelper?.isMobile && type == 'column'">
          <ion-item *ngFor="let entry of directory"
                    [detail]="entry.detail" lines="none" [path]="entry.path">
            <ion-icon [color]="entry.iconColor"
                      [name]="entry.icon" slot="start"></ion-icon>
            {{entry.displayName}}
          </ion-item>
        </ion-list>
        <ion-row *ngIf="pageHelper?.isMobile || type == 'full_screen'">
          <ion-col class="iconCol" size="4"
                   size-xl="1" size-lg="1" size-md="3" size-sm="4" size-xs="6"
                   *ngFor="let entry of directory" [path]="entry.path">
            <ion-icon [color]="entry.iconColor"
                      [name]="entry.icon"></ion-icon>
            <ion-label>
              {{entry.displayName}}
            </ion-label>
          </ion-col>
        </ion-row>
      </ion-content>
    </umn-page>
  `,
  styles: [
    `
        ion-row {
            margin: 8px;
        }

        .iconCol {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 1rem 0;
            grid-gap: 1rem;
        }

        .iconCol ion-icon {
            font-size: 4rem;
        }

        .iconCol ion-label {
            overflow: hidden;
            word-break: break-all;
            text-align: center;
        }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinderPageComponent implements AfterViewInit {
  directory?: null | any[] | undefined;

  @ViewChild("page", { static: false, read: PageComponent }) page?: PageComponent;
  private id: any;
  isLoading: any;
  type: "column" | "full_screen" | undefined = "column";

  constructor(private cdr: ChangeDetectorRef,
              private router: Router,
              public pageHelper: PageHelper,
              private explorerController: ExplorerController,
              private route: ActivatedRoute) {
    this.type = explorerController.type == "column" ? "column" : "full_screen";
    this.explorerController.typeChange$.subscribe((type) => {
      this.type = type == "column" ? "column" : "full_screen";
      if(this.page){

        this.page.desktopViewType = this.type;
        this.page.onWindowResize(null)
      }
      this.cdr.detectChanges();
    })
  }




  ngAfterViewInit(): void {
    this.route.params.subscribe(async params => {
      this.id = params["id"];
      this.onRouteChange();
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        //this is called anytime there is change in the url
        this.onRouteChange();
      });
  }

  private async onRouteChange() {
    if (this.id && this.explorerController?.path) {
      // let routeTillMe:any = this.page?.parentPage?.contentPath.replace(/\/\//g, "/")+ "/"+params["id"];
      let startingIndex = window.location.href.indexOf("/" + this.explorerController.path) + this.explorerController.path.length + 2;
      let endingIndex = window.location.href.indexOf("/" + this.id) + ("/" + this.id).length;
      let routeTillMe: any = window.location.href.substring(startingIndex, endingIndex);


      routeTillMe = routeTillMe.split("/");
      let directory = routeTillMe.splice(routeTillMe.indexOf(this.explorerController?.path) + 1);
      directory = directory.join("/");
      this.isLoading = true;
      this.directory = await this.explorerController.getDirectory(directory);
      this.isLoading = false;
      this.cdr.detectChanges();
    }

  }
}
