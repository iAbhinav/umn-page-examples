import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from "@angular/core";
import { ExplorerController } from "./explorer.controller";
import { Subscription } from "rxjs";
import { PageComponent, PageHelper } from "@umun-tech/page";
import { ScreenSizeService } from "@umun-tech/page";

@Component({
  selector: "explorer-page",
  template: `
    <umn-page #page 
              (pathChange)="pathChanged($event)" [class.icons]="isIconsClass">
      
      <ion-content>
        <div class="empty">
          <ion-button (click)="openDirectory()">Select Folder</ion-button>
        </div>
      </ion-content>
      <ion-footer *ngIf="!page?.isMobile && type=='column'" class="umn-page-footer">
        <ng-container *ngTemplateOutlet="footer"></ng-container>
      </ion-footer>
    </umn-page>
    <ion-footer *ngIf="!page?.isMobile && type!='column'" class="umn-page-footer"
                [class.icons]="isIconsClass">
      <ng-container *ngTemplateOutlet="footer"></ng-container>
    </ion-footer>

    <ng-template #footer>
      <ion-toolbar>
        <ion-breadcrumbs slot="start">
          <ion-breadcrumb *ngFor="let p of page?.stack"
                          (click)="p.navigateToThisPage()">{{p?.label}}</ion-breadcrumb>
        </ion-breadcrumbs>
        <ion-buttons slot="end">
          <ion-button id="click-trigger">
            <ion-icon name="grid-outline" slot="start"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ng-template>

    <ion-popover trigger="click-trigger" triggerAction="click" #popover
                 cssClass="my-custom-class"
                 event="click">
      <ng-template>
        <ion-list>
          <ion-item (click)="popover.dismiss();selectView('icons')">
            <ion-icon slot="end" name="checkmark-outline" *ngIf="type == 'icons'"></ion-icon>
            <ion-label>Icons</ion-label>
          </ion-item>
          <ion-item (click)="popover.dismiss();selectView('column')">
            <ion-icon slot="end" name="checkmark-outline" *ngIf="type == 'column'"></ion-icon>
            <ion-label>Columns</ion-label>
          </ion-item>
          <ion-item (click)="popover.dismiss();selectView('gallery')">
            <ion-icon slot="end" name="checkmark-outline" *ngIf="type == 'gallery'"></ion-icon>
            <ion-label>Gallery</ion-label>
          </ion-item>
          <ion-item (click)="popover.dismiss();selectView('list')">
            <ion-icon slot="end" name="checkmark-outline" *ngIf="type == 'list'"></ion-icon>
            <ion-label>List</ion-label>
          </ion-item>
        </ion-list>
      </ng-template>
    </ion-popover>
  `,
  styles: [
    `
        umn-page {
            height: 100% !important;
        }

        umn-page.icons {
            margin-bottom: 44px;
        }

        ion-footer.icons {
            position: absolute;
            bottom: 0;
        }

        .empty {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    `
  ]
})
export class ExplorerPageComponent implements OnDestroy{
  type: "icons" | "column" | "gallery" | "list";
  private screenSizeSubscription: Subscription;
  get isIconsClass() {
    return this.type != "column";
  }

  @ViewChild("page", { static: false, read: PageComponent }) page?: PageComponent;


  constructor(private cdr: ChangeDetectorRef,
              private pageHelper: PageHelper,
              private screen:ScreenSizeService,
              public explorerController: ExplorerController) {
    this.type = this.pageHelper.isMobile ? "icons" : "column";
    this.screenSizeSubscription =  this.screen.screenSizeChange$.subscribe(()=>{

      if(this.page){
      //   this.page.desktopViewType = this.type == 'column'?'column': 'full_screen';
      //   this.page.onWindowResize(null)
      }
    })
  }


  async openDirectory() {
    try {
      let dirHandle = await this.explorerController.chooseRootDirectory();
      if (this.page){
        await this.page.push(dirHandle.name, null, "merge", true);
      }
    } catch (e) {
      //do nothing here, user cancelled
    }
  }


  selectView(type: "icons" | "column" | "gallery" | "list") {
    this.type = type;
    this.explorerController.type = type;
    if(this.page){
      this.page.desktopViewType = type == 'column'?'column': 'full_screen';
      this.page.onWindowResize(null)
    }
    this.cdr.detectChanges();
  }

  pathChanged(newPath: string) {
    if(this.explorerController.path != newPath){
      console.log("path changed", newPath, this.explorerController.path)
      this.explorerController.path = newPath;
      this.cdr.detectChanges()
    }


  }

  ngOnDestroy(): void {
    this.screenSizeSubscription?.unsubscribe()
  }
}
