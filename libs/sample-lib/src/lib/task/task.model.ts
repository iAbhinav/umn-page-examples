import {Meta} from "@umun-tech/core";
import {Organization} from "@umun-tech/organization";
    import {Employee} from './../employee/employee.model';

export class Task extends Meta{
    organization?: Organization;

        description?:string;
        assignedTo?:Employee;
        status?:number;
}
