import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EntityCrudServiceInterface} from '@umun-tech/entity';
import {Observable} from 'rxjs';
import {TaskService} from "./task.service";

@Injectable({
    providedIn: 'root'
})
export class TaskServiceResolver implements Resolve<EntityCrudServiceInterface> {
    constructor(private service: TaskService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EntityCrudServiceInterface>
        | Promise<EntityCrudServiceInterface> | EntityCrudServiceInterface {
        return new Observable(observer => {
            observer.next(this.service)
            observer.complete();
        })
    }

}
