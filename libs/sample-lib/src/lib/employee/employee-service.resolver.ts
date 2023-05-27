import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EntityCrudServiceInterface} from '@umun-tech/entity';
import {Observable} from 'rxjs';
import {EmployeeService} from "./employee.service";

@Injectable({
    providedIn: 'root'
})
export class EmployeeServiceResolver implements Resolve<EntityCrudServiceInterface> {
    constructor(private service: EmployeeService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EntityCrudServiceInterface>
        | Promise<EntityCrudServiceInterface> | EntityCrudServiceInterface {
        return new Observable(observer => {
            observer.next(this.service)
            observer.complete();
        })
    }

}
