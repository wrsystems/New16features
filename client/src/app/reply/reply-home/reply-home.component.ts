// 11-10 copied from flak-flak to use pagination for flaks

import { Component, OnInit } from '@angular/core';
import { Entry } from '../../_models/Entry';
import { Pagination } from '../../_models/pagination';
import { EntryService } from '../../_services/entry.service';

@Component({
  selector: 'app-reply-home',
  templateUrl: './reply-home.component.html',
  styleUrls: ['./reply-home.component.css']
})
export class ReplyHomeComponent implements OnInit {

  entrys: Entry[] = [];
  pagination: Pagination;
  container = 'Inbox';
  pageNumber = 1;
  pageSize = 5;
  loading = false;
  hardUsername = 'ruthie';  // for testing
  organizations: Entry[];  // for testing

  constructor(private entryService: EntryService) { }

  ngOnInit(): void {
    this.loadEntrys();
  }

  loadEntrys() {

    // console.log('Start list flak() ');
    // this.listFlak();  // for testing

    this.loading = true;
    this.entryService.getEntrys(this.pageNumber, this.pageSize, this.container).subscribe(response => {
      this.entrys = response.result;
      this.pagination = response.pagination;
      this.loading = false;

      // console.log('Flak pagination : ', response.result)    // prints out each one

      // this.listFlak();  // for testing

    });
  }

  listFlak() {
    this.entryService.getEntrysUsername(this.hardUsername).subscribe(result => {
        // this.noMatch = '';
        this.organizations = result;
        console.log('I am here to list ruthie :', this.organizations );

    });
  }

  // deleteFlak(id: number) {
  //   this.flakService.deleteFlak(id).subscribe(() => {
  //     this.flaks.splice(this.flaks.findIndex(e => e.id === id), 1);
  //   });
  // }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadEntrys();
  }

}
