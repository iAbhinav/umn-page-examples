import {ChangeDetectionStrategy, Component, Input, ChangeDetectorRef, ViewEncapsulation} from '@angular/core';
import {PreviewComponentImpl} from "@umun-tech/entity";
import {Employee} from "../employee.model";
import {UpdateViewComponentImpl} from "@umun-tech/entity";

@Component({
  selector: 'umn-employee-update-view.component',
  templateUrl: './employee-update-view.component.html',
  styleUrls: ['./employee-update-view.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeUpdateViewComponent extends UpdateViewComponentImpl<Employee>{
  employee?: Employee;

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }
  get entity() {
    return this.employee;
  }

  @Input() set entity(employee: Employee) {
    this.employee = employee;
  }
}