import {ChangeDetectionStrategy, Component, Input, ChangeDetectorRef, ViewEncapsulation} from '@angular/core';
import {PreviewComponentImpl} from "@umun-tech/entity";
import {Task} from "../task.model";
import {UpdateViewComponentImpl} from "@umun-tech/entity";

@Component({
  selector: 'umn-task-update-view.component',
  templateUrl: './task-update-view.component.html',
  styleUrls: ['./task-update-view.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskUpdateViewComponent extends UpdateViewComponentImpl<Task>{
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