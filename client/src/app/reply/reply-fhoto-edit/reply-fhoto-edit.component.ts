import { Component, OnInit, Input, Output, ViewChild, HostListener } from '@angular/core';

import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

import { EntryService } from '../../_services/entry.service';
import { Entry } from '../../_models/entry';
import { ActivatedRoute } from '@angular/router';
import { Fhoto } from '../../_models/fhoto';
import { FhotoService } from '../../_services/fhoto.service';

@Component({
  selector: 'app-reply-fhoto-edit',
  templateUrl: './reply-fhoto-edit.component.html',
  styleUrls: ['./reply-fhoto-edit.component.css']
})

export class ReplyFhotoEditComponent implements OnInit {

  // @Input() entry: Entry
  @Output() entryOut: Entry;
  @Output() fhotos: Fhoto[] = [];

  // fhotos: Fhoto[] = [];
  user: User;
  hardId = 16;
  entry: Entry;

  constructor(private accountService: AccountService, private fhotoService: FhotoService,
    private entryService: EntryService, private route: ActivatedRoute, private toastr: ToastrService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {

   this.route.data.subscribe(data => {  // uses resolver reply-list.resolver  12-24
      this.entry = data.entry;
      // console.log('REPLY-FHOTO-EDIT at init, after route : ', this.entry)    // brings entry object
    });

    this.entryOut = this.entry;
    console.log('REPLY-FHOTO-EDIT to print entry (make sure values ok) : ', this.entry )
    this.loadFhoto();
  }


  loadFhoto() {
    this.fhotoService.getFhotoEntryId(this.entry.id).subscribe(result => {
      this.fhotos = result;
      console.log('REPLY-FHOTO-EDIT load entry FHOTOS !! OBJECT : ', this.fhotos )
    })
  }
}
