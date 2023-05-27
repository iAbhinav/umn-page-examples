import { Component, ViewChild } from "@angular/core";
import { LoaderComponent, RestService } from "@umun-tech/core";
import { UserStorageService } from "@umun-tech/iam";
import { Platform } from "@ionic/angular";
import { AccountAccessService } from "@umun-tech/access";


import { _home_ } from "./app-routing.module";

@Component({
  selector: 'sample-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('loader') loader!: LoaderComponent;

  constructor(private userStorage: UserStorageService,
              private platform: Platform,
              accountAccessService: AccountAccessService) {
    this.initStorage();
    this.platform.ready().then( () => {
      RestService._loader = this.loader;
    });
    accountAccessService.init(_home_);
  }

  private initStorage() {
    this.userStorage.init();
  }
}
