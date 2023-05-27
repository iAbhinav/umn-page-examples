import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {CoreModule} from "@umun-tech/core";
import {EmployeeUpdateViewComponent} from "./employee-update-view/employee-update-view.component";
import {EntityModule} from "@umun-tech/entity";
import {FormsModule} from "@angular/forms";
import {FormModule} from "@umun-tech/form";
import {EmployeeViewComponent} from "./employee-view/employee-view.component";
import {EmployeeViewHeaderComponent} from "./employee-view-header/employee-view-header.component";

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
        EmployeeUpdateViewComponent
    ],
    declarations: [
        EmployeeUpdateViewComponent,
        EmployeeViewComponent,
        EmployeeViewHeaderComponent,
    ]
})
export class EmployeeModule {

}