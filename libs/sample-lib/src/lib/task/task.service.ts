import {Injectable} from "@angular/core";
import {EntityPrefService} from "@umun-tech/entity";
import {RestService} from "@umun-tech/core";
import {OrganizationSelectionService} from "@umun-tech/organization";
import {TaskViewComponent} from "./task-view/task-view.component";
import {TaskViewHeaderComponent} from "./task-view-header/task-view-header.component";
import {TaskUpdateViewComponent} from "./task-update-view/task-update-view.component";
import {TaskPrefService} from "./task-pref.service";
import {EntityAccessService} from "@umun-tech/access";
import { EmployeePrefService } from "../employee/employee-pref.service";
import { EmployeeService, employee_entity_name } from "../employee/employee.service";

export const task_entity_name = "Task";

@Injectable({providedIn: 'root'})
export class TaskService extends EntityAccessService {
    isBanNameEdit: boolean = false;
    pageTitle: string = "Tasks";
    createTitle: string = "Create Task";
    previewComponent: any = TaskViewComponent;
    previewOnly: boolean = false;

    isCreateInToolbar = true
    isHideCreate = true
    isNoPageTitle = true

    isNameOptional = true;
    //nameLabel = "";
    isStopLocalNameSearch = true;

    updateComponent = TaskUpdateViewComponent;
    headerComponent = TaskViewHeaderComponent;
    customPrefService: EntityPrefService;

    constructor(rest: RestService,
                private prefService: TaskPrefService,
                public organizationSelectionService: OrganizationSelectionService) {
        super(rest, organizationSelectionService);
        EntityPrefService.addTemplateRequestParams(task_entity_name, this.getTemplateRequestParamsObject)
        this.customPrefService = prefService
        this.updateAccordingToAccess()
        this.setAddMoreButtonMapping();
    }

    private setAddMoreButtonMapping() {
            EntityPrefService.addSelectPrefKeyEntity({
            key: "--assigned-to",
            prefService: EmployeePrefService,
            entityName: employee_entity_name,
            crudService: EmployeeService,
            label: "Add More"
        })
    }

    get URL(): string {
        return `/v1/secured/task`;
    }

    override get createUrlPrefix() {
        return `?organizationId=${this.organizationSelectionService.organizationId}`
    }

    override get readUrlPrefix() {
        return `&organizationId=${this.organizationSelectionService.organizationId}`
    }

    override getTemplateRequestParamsObject = (): {} => {
        return {organizationId: this.organizationSelectionService.organizationId}
    }

    getReadPrivileges(): string[] {
        return ['--task-read', '--task-read-mine']
    }

    getEntityName() {
        return task_entity_name
    }
}

