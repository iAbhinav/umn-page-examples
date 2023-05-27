import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {CoreModule} from "@umun-tech/core";
import {TaskUpdateViewComponent} from "./task-update-view/task-update-view.component";
import {EntityModule} from "@umun-tech/entity";
import {FormsModule} from "@angular/forms";
import {FormModule} from "@umun-tech/form";
import {TaskViewComponent} from "./task-view/task-view.component";
import {TaskViewHeaderComponent} from "./task-view-header/task-view-header.component";

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        CoreModule,
        FormsModule,
        FormModule,
        EntityModule
    ],
    exports: [
        TaskUpdateViewComponent
    ],
    declarations: [
        TaskUpdateViewComponent,
        TaskViewComponent,
        TaskViewHeaderComponent,
    ]
})
export class TaskModule {

}