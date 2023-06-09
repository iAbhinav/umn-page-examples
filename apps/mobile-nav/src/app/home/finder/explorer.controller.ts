import { Injectable } from "@angular/core";
import { FinderPageComponent } from "./finder.component";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ExplorerController {


  private _typeChange = new Subject<any>();
  typeChange$ = this._typeChange.asObservable();

  path?: string;
  private entries?: () => Promise<any[]>;
  private _type: "icons" | "column" | "gallery" | "list" = "column";

  constructor() {

  }

  get type(): "icons" | "column" | "gallery" | "list" {
    return this._type;
  }

  set type(value: "icons" | "column" | "gallery" | "list") {
    this._typeChange.next(event);
    this._type = value;
  }

  async chooseRootDirectory() {
    const dirHandle = await (window as any).showDirectoryPicker();
    this.entries = async () => await this.getDirectoryEntries(dirHandle);
    return dirHandle
  }

  async getDirectory(path: string) {
    if (!this.entries){
      // console.warn("ExplorerController: entries not set")
      return [];
    }

    // filter(Boolean) is to ignore empty strings caused by leading/trailing slashes
    let pathParts = path.split("/").filter(Boolean);
    pathParts = pathParts.splice(1);
    let currentEntries = await this.entries();
    for (const part of pathParts) {
      const foundEntry = currentEntries?.find(entry => entry.name === part && entry.kind === "directory");
      if (!foundEntry) {
        return null;
      }
      currentEntries = await foundEntry.getDirectoryEntries();
    }
    return currentEntries;
  }

  private async getDirectoryEntries(dirHandle: any) {
    const entries = [];
    for await (const entry of dirHandle.values()) {
      const item: any = {
        name: entry.name,
        displayName: ExplorerController.shorten(entry.name, 20),
        kind: entry.kind,
        icon: "document",
        iconColor: "medium",
        detail: "false",
        path: ""
      };
      if (entry.kind === "directory") {
        item.icon = "folder";
        item.iconColor = "primary";
        item.detail = "";
        item.path = item.name
        item.getDirectoryEntries = async () => await this.getDirectoryEntries(entry);
      }
      entries.push(item);
    }
    return entries;
  }

  static shorten(text: any, maxLength:any) {
    var ret = text;
    if (ret.length > maxLength) {
      ret = ret.substr(0,maxLength-3) + "...";
    }
    return ret;
  }

}
