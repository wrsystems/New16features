import { Component, OnInit } from '@angular/core';
import { Flak } from '../../_models/flak';
import { Pagination } from '../../_models/pagination';
import { FlakService } from '../../_services/flak.service';

@Component({
  selector: 'app-flak-flaks',
  templateUrl: './flak-flaks.component.html',
  styleUrls: ['./flak-flaks.component.css']
})
export class FlakFlaksComponent implements OnInit {

  flaks: Flak[] = [];
  pagination: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;

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
    })
  }

  deleteFlak(id: number) {
    this.flakService.deleteFlak(id).subscribe(() => {
      this.flaks.splice(this.flaks.findIndex(m => m.id === id), 1);
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadFlaks();
  }

}
