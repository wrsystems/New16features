import { Component, OnInit, OnDestroy, Input, Output, ViewChild, HostListener } from '@angular/core';
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

import { Observable, Subscription, Subject } from 'rxjs';  // 01-16-21
import { filter } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';

import { Flak } from '../../_models/flak';


@Component({
  selector: 'app-flak-fhoto-edit',
  templateUrl: './flak-fhoto-edit.component.html',
  styleUrls: ['./flak-fhoto-edit.component.css']
})

export class FlakFhotoEditComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  @Input() entry: Entry;
  @Input() flak: Flak;
  @Output() entryOut: Entry;
  @Output() flakOut: Flak;
  @Output() fhotos: Fhoto[] = [];

  observable: Observable<number>;   // 01-16-21
  latestValue: number;     // 01-16-21
  subscription: Subscription;     // 01-16-21


  // fhotos: Fhoto[] = [];
  user: User;
  // entry: Entry;   //duplicate when added input
  // entry$: Entry;  // for testing

  // @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
  //   if (this.editForm.dirty) {
  //     $event.returnValue = true;
  //   }
  // }

  constructor(private accountService: AccountService, private fhotoService: FhotoService,
    private entryService: EntryService, private route: ActivatedRoute, private toastr: ToastrService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {

    this.entryOut = this.entry;
    this.flakOut = this.flak;

    console.log('FLAK-FHOTO-EDIT to print entry (make sure values ok) : ', this.entry )
    console.log('FLAK-FHOTO-EDIT to print flak  (make sure values ok) : ', this.flak )

    this.fhotoService.getFhotoEntryId(this.entry.id)
          .pipe(
              startWith([]),
              filter(fhotos => fhotos.length > 0),
              takeUntil(this.ngUnsubscribe)
          )
          .subscribe(result => {
      this.fhotos = result;
      console.log('FLAK-FHOTO-EDIT load entry FHOTOS !! OBJECT : ', this.fhotos )
    })

  }

ngOnDestroy() {
  this.ngUnsubscribe.next();
  this.ngUnsubscribe.complete();
}

  loadFhoto() {
    this.fhotoService.getFhotoEntryId(this.entry.id).subscribe(result => {
      this.fhotos = result;
      console.log('FLAK-FHOTO-EDIT load entry FHOTOS !! OBJECT : ', this.fhotos )
    })
  }

}
