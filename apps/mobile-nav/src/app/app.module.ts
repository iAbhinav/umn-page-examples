import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { NxWelcomeComponent } from "./nx-welcome.component";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

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
        path: "home",
        loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "home"
      }
    ], { useHash: true, initialNavigation: "enabledBlocking" }),
    IonicModule.forRoot({
      mode: "ios"
    })
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
