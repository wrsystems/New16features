import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

// 12-28
import { FlakService } from '../_services/flak.service';
import { Flak } from '../_models/Flak';

@Injectable({
    providedIn: 'root'
})
export class FlaksDetailResolver implements Resolve<Flak> {

    constructor(private flakService: FlakService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Flak> {

        return this.flakService.getFlakId(+route.paramMap.get('id'));
    }

    // 12-23 copied from member-detailed.resolve and modified
// RETURNS OBSERVABLE as member (the first line above)
// NOT NEED TO SUBSRIBE, ITS DONE FOR US
// POINT GET DATA BEFORE set template
// implements Resolve interface from Angular
// not component, so @Injectable
// we specify the service method to be called in this case getMember
// getMember actually access the cashe (must review code)
// another option would have been to use Navigation extras ???? But noway to access inside resolve ... says Neil
// get the username from the paramMap
// reason to use - - not using *ngIf in member.detail html

}
