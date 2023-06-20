import { APP_INITIALIZER, NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";

@NgModule({
  exports: [RouterModule],
})
export class UmunRouterModule {
  static roots: Routes;
  static forRoot(routes: Routes) {
    // UmunRouterModule.roots =routes;
    // you can add your additional logic here
    return RouterModule.forChild(routes);
  }

  static forChild(routes: Routes) {
    return RouterModule.forChild(routes);
  }
}

export function initializeAppCustomLogic(router: Router): () => Promise<void> {
  //worked when added

  // providers: [
  //   {
  //     provide: APP_INITIALIZER,
  //     useFactory: initializeAppCustomLogic,
  //     multi: true,
  //     deps: [Router],
  //   },
  // ],

  //to app.module.ts


  return () => {
    return new Promise((resolve) => {
      console.log("***process custom logic, Angular init***", router);

      router.config.forEach((route) => {
        console.log(route);
        if (route.loadChildren) {
          // @ts-ignore
          route.loadChildren().then((m) => {

          });
        }
      });

      // router.resetConfig([
      //   ...routes,
      //   {
      //     path: 'dynamic',
      //     component: DynamicComponent,
      //   },
      // ]);

      setTimeout(() => {
        console.log(
          "***3 seconds latter, custom logic finished, Angular init***"
        );
        resolve();
      }, 3000);
    });
  };
}
