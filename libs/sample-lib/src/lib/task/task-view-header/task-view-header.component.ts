import {ChangeDetectionStrategy, Component, Input, ChangeDetectorRef, ViewEncapsulation} from '@angular/core';
import {PreviewComponentImpl} from "@umun-tech/entity";
import {Task} from "../task.model";
import {UpdateViewComponentImpl} from "@umun-tech/entity";

@Component({
  selector: 'umn-task-view-header.component',
  templateUrl: './task-view-header.component.html',
  styleUrls: ['./task-view-header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskViewHeaderComponent extends PreviewComponentImpl{
  task?: Task;

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }
  get entity() {
    return this.task;
  }

  @Input() set entity(task: Task) {
    this.task = task;
  }
}