import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { NxWelcomeComponent } from "./nx-welcome.component";
import { RouteReuseStrategy, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReuseRouteStrategy } from "./page/services/ReuseRouteStrategy";

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: "home/place",
        loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "home/place"
      }
    ], { useHash: true, initialNavigation: "enabledBlocking" }),
    IonicModule.forRoot({
      mode: "ios"
    })
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: ReuseRouteStrategy }
  ],
  exports: [
  ],
  // providers: [
  //   {
  //     provide: APP_INITIALIZER,
  //     useFactory: initializeAppCustomLogic,
  //     multi: true,
  //     deps: [Router],
  //   },
  // ],
  bootstrap: [AppComponent]
})
export class AppModule { }
