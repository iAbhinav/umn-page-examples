import {Injectable} from "@angular/core";
import {EntityPrefService} from "@umun-tech/entity";
import {RestService} from "@umun-tech/core";
import {OrganizationSelectionService} from "@umun-tech/organization";
import {EmployeeViewComponent} from "./employee-view/employee-view.component";
import {EmployeeViewHeaderComponent} from "./employee-view-header/employee-view-header.component";
import {EmployeeUpdateViewComponent} from "./employee-update-view/employee-update-view.component";
import {EmployeePrefService} from "./employee-pref.service";
import {EntityAccessService} from "@umun-tech/access";

export const employee_entity_name = "Employee";

@Injectable({providedIn: 'root'})
export class EmployeeService extends EntityAccessService {
    isBanNameEdit: boolean = false;
    pageTitle: string = "Employees";
    createTitle: string = "Create Employee";
    previewComponent: any = EmployeeViewComponent;
    previewOnly: boolean = false;

    isCreateInToolbar = true
    isHideCreate = true
    isNoPageTitle = true

    isNameOptional = true;
    //nameLabel = "";
    isStopLocalNameSearch = true;

    updateComponent = EmployeeUpdateViewComponent;
    headerComponent = EmployeeViewHeaderComponent;
    customPrefService: EntityPrefService;

    constructor(rest: RestService,
                private prefService: EmployeePrefService,
                public organizationSelectionService: OrganizationSelectionService) {
        super(rest, organizationSelectionService);
        EntityPrefService.addTemplateRequestParams(employee_entity_name, this.getTemplateRequestParamsObject)
        this.customPrefService = prefService
        this.updateAccordingToAccess()
        this.setAddMoreButtonMapping();
    }

    private setAddMoreButtonMapping() {
    }

    get URL(): string {
        return `/v1/secured/employee`;
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
        return ['--employee-read', '--employee-read-mine']
    }

    getEntityName() {
        return employee_entity_name
    }
}

