// 11-10 copied from flak-flak to use pagination for flaks

import { Component, OnInit } from '@angular/core';
import { Flak } from '../../_models/flak';
import { Pagination } from '../../_models/pagination';
import { FlakService } from '../../_services/flak.service';

@Component({
  selector: 'app-flak-home',
  templateUrl: './flak-home.component.html',
  styleUrls: ['./flak-home.component.css']
})
export class FlakHomeComponent implements OnInit {

  flaks: Flak[] = [];
  pagination: Pagination;
  container = 'Inbox';
  pageNumber = 1;
  pageSize = 5;
  loading = false;
  hardUsername = 'todd';  // for testing
  organizations: Flak[];  // for testing

  constructor(private flakService: FlakService) { }

  ngOnInit(): void {
    this.loadFlaks();
  }

  loadFlaks() {
    this.loading = true;
    this.flakService.getFlaks(this.pageNumber, this.pageSize, this.container).subscribe(response => {
      this.flaks = response.result;
      this.pagination = response.pagination;
      this.loading = false;

      // console.log('Flak pagination : ', response.result)
      // this.listFlak();  // for testing

    });
  }

  listFlak() {
    this.flakService.getFlakThread(this.hardUsername).subscribe(result => {
        // this.noMatch = '';
        this.organizations = result;
        console.log('I am here to list ruthie :', this.organizations );

    });
  }

  deleteFlak(id: number) {
    this.flakService.deleteFlak(id).subscribe(() => {
      this.flaks.splice(this.flaks.findIndex(m => m.id === id), 1);
    });
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadFlaks();
  }

}
