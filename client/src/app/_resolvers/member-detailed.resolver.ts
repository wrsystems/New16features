import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';

@Injectable({
    providedIn: 'root'
})
export class MemberDetailedResolver implements Resolve<Member> {

    constructor(private memberService: MembersService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Member> {
        return this.memberService.getMember(route.paramMap.get('username'));
    }

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
