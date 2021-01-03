import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { EntryService } from '../_services/entry.service';
import { Entry } from '../_models/Entry';

@Injectable({
    providedIn: 'root'
})
export class EntryFhotoResolver implements Resolve<Entry> {

    constructor(private entryService: EntryService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Entry> {

        return this.entryService.getEntryId(+route.paramMap.get('id'));  // +route used to convert to number
    }

}
