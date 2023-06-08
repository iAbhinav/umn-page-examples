import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from "@angular/core";

@Component({
  selector: "app-create-heydio",
  template: `


    <umn-page>
      <ion-header [translucent]="true">
        <ion-toolbar>
          <ion-buttons slot="start">
            <umn-back label="Cancel"></umn-back>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button size="large" routerLink="../" 
                        [queryParams]="{savedHeydieName: input.value}"
                        queryParamsHandling="merge">
              <ion-label>Save</ion-label>
            </ion-button>
          </ion-buttons>
          <ion-title>
            Create Heydio
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content [fullscreen]="true">
        <ion-header collapse="condense">
          <ion-toolbar>
            <ion-title size="large">
              Create Heydio
            </ion-title>
          </ion-toolbar>
        </ion-header>
        
        <ion-list [inset]="true" mode="md">
          <ion-item >
            <ion-label position="stacked">Name</ion-label>
            <ion-input #input placeholder="Enter your name"></ion-input>
          </ion-item>
        </ion-list>
      </ion-content>
    </umn-page>

  `,
  styles: [
    `
        .active {
            --color: var(--ion-color-primary);
        }
    `
  ]
})
export class CreateHeydioComponent {
}
