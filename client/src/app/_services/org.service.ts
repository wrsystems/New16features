import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Organization } from '../_models/organization';

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrgName(orgname: string) {
    return this.http.get<Organization[]>(this.baseUrl + 'organizations/name/' + orgname);
  }

}
