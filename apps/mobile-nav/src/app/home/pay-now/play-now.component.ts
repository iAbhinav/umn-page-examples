import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  ViewChild
} from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { IonRouterOutlet } from "@ionic/angular";
import { DisplayService } from "@umun-tech/core";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-playnow",
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      state('out', style({ opacity: 0 })),
      transition('in <=> out', [
        animate(500) // Adjust timing to your liking
      ])
    ])
  ],
  template: `
  

    <ion-row class="ion-nowrap" *ngIf="!isMobile">
      <ion-col class=" content">
        <div class="ion-page">
         <ng-container *ngTemplateOutlet="content"></ng-container>
        </div>
      </ion-col>
      <ion-col class="outlet">
        <ion-router-outlet #outlet ></ion-router-outlet>
      </ion-col>
    </ion-row>
    
    
    
    
    <ion-row class="ion-nowrap" *ngIf="isMobile">
      <div [class.ion-page]="!showOutlet" [hidden]="showOutlet">
        <ng-container *ngTemplateOutlet="content"></ng-container>
      </div>
      <div [hidden]="!showOutlet">
        <ion-router-outlet #outlet></ion-router-outlet>
      </div>
    </ion-row>
    
    
    
    
    <ng-template #content>
      <ion-header>
        <ion-toolbar>
          <ion-buttons>
            <ion-back-button></ion-back-button>
          </ion-buttons>
          <ion-title routerLink="/home/play-now/" routerLinkActive="active" >
            Play Now
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        Hi I am PlayNow
        <ion-item [routerLink]="parentPath + '/heydio'" routerLinkActive="active"
                  [queryParams]="{ stationName: 'Heydio'}"
                  queryParamsHandling="merge">
          Heydio 
        </ion-item>
        <ion-item [routerLink]="parentPath +  '/seydio'" routerLinkActive="active" queryParamsHandling="merge">
          Seydio 
        </ion-item>

      </ion-content>
    </ng-template>
  `,
  styles:[
    `
        ion-row {
            height: 100%;
            display: flex;
        }
      .content {
          width: 50%;
      }
      .outlet {
          width: 0%;
      }
      
      .full-width {
          width: 100% !important;
      }
      
      .active {
          --color: var(--ion-color-primary);
      }
    `
  ]
})
export class PlayNowComponent  implements AfterViewInit{

  @ViewChild("outlet", {static: false, read: IonRouterOutlet}) ionRouterOutlet?: IonRouterOutlet
  showOutlet = false;
  isMobile = this.display.isSmall;
   parentPath: string;
  constructor(private router: Router, private display: DisplayService,
              private route: ActivatedRoute,
              private cdr:ChangeDetectorRef) {
    this.parentPath = this.route.snapshot.pathFromRoot.map(part => part.url.map(segment => segment.path).join('/')).join('/');
  }

  @HostListener('window:resize', ['$event'])
  onScreenSizeChange() {
    this.isMobile = this.display.isSmall;
    this.parentPath = this.route.snapshot.pathFromRoot.map(part => part.url.map(segment => segment.path).join('/')).join('/');
    this.setOutletSize()
    this.cdr.detectChanges()
  }


  ngAfterViewInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
       this.setOutletSize()
      });

  }

  get outletState() {
    return this.showOutlet ? 'in' : 'out';
  }

  private setOutletSize() {
    try{
      // navigation has ended, you could trigger any necessary actions here
      console.log('Navigation ended:', event);
      console.log(this.ionRouterOutlet?.component.constructor.name)
      this.showOutlet = this.ionRouterOutlet?.component?.constructor?.name != undefined
        && this.ionRouterOutlet?.component?.constructor?.name != "EmptyComponent";

      console.log("Show outlet", this.showOutlet)
    }catch (e) {

    }
  }
}
