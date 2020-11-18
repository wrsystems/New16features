// 11/15 copied from entry-list to get started

import { Component, OnInit } from '@angular/core';
import { Organization } from '../../_models/organization';
import { OrgService } from '../../_services/Org.service';

@Component({
  selector: 'app-org-list',
  templateUrl: './org-list.component.html',
  styleUrls: ['./org-list.component.css']
})

export class OrgListComponent implements OnInit {

  organizations: Organization[];
  orgname = 'Arbys';
  listbutton = false;
  noMatch: string;

  constructor(private orgService: OrgService) { }

  ngOnInit(): void {
    this.listOrg();
  }

  listOrg() {
    this.orgService.getOrgName(this.orgname).subscribe(result => {
        // this.noMatch = '';
        this.organizations = result;
        console.log('I am here', this.orgname );

    });
  }
}
