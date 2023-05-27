import {Injectable} from "@angular/core";
import {EntityPref, EntityPrefService} from "@umun-tech/entity";
import {RestService} from "@umun-tech/core";

@Injectable({
    providedIn: 'root'
})
export class TaskPrefService extends EntityPrefService{
    protected static override readonly url: string = "/v1/secured/task/pref";

    constructor(protected override rest: RestService) {
        super(rest);
    }

    override getTemplate(entityName: string): Promise<EntityPref[]> {
        let params = this.getParams(entityName);
        if (!params) {
            params = '?';
        } else {
            params += '&';
        }
        //add more params here
        return this.rest.callServer(`${TaskPrefService.url}/template/${entityName}${params}`).then(res => {
            return JSON.parse(res);
        })
    }
}