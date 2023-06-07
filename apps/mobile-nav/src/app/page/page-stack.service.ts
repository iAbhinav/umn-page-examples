import { ChangeDetectorRef, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LocationStrategy } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class PageStackService {
  constructor(private route: ActivatedRoute) {
  route.url.subscribe(() => {
    console.log("pathChanged")
  })
}
}
