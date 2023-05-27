import {ChangeDetectionStrategy, Component, Input, ChangeDetectorRef, ViewEncapsulation} from '@angular/core';
import {PreviewComponentImpl} from "@umun-tech/entity";
import {Employee} from "../employee.model";
import {UpdateViewComponentImpl} from "@umun-tech/entity";

@Component({
  selector: 'umn-employee-view-header.component',
  templateUrl: './employee-view-header.component.html',
  styleUrls: ['./employee-view-header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeViewHeaderComponent extends PreviewComponentImpl{
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