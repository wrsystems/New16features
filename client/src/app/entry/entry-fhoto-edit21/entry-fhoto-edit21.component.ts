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
import { Place } from '../../_models/place';
import { Observable, Subscription, Subject } from 'rxjs';  // 01-16-21
import { filter } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-entry-fhoto-edit21',
  templateUrl: './entry-fhoto-edit21.component.html',
  styleUrls: ['./entry-fhoto-edit21.component.css']
})

export class EntryFhotoEdit21Component implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  @Input() entry: Entry
  @Input() place: Place;
  @Output() entryOut: Entry;
  @Output() fhotos: Fhoto[] = [];
  @Output() placeOut: Place;

  observable: Observable<number>;   // 01-16-21
  latestValue: number;     // 01-16-21
  subscription: Subscription;     // 01-16-21

  // @ViewChild('editForm') editForm: NgForm;

  // fhotos: Fhoto[] = [];
  user: User;
  // entry: Entry;   //duplicate when added input
  // entry$: Entry;  // for testing
  hardId = 16;

  // @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
  //   if (this.editForm.dirty) {
  //     $event.returnValue = true;
  //   }
  // }

  constructor(private accountService: AccountService, private fhotoService: FhotoService,
    private entryService: EntryService, private route: ActivatedRoute, private toastr: ToastrService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

// notes: 01-03-21 sunday
//     need entryID component gathers photos which are then viewed in entry-detail
//          entryId can be obtained through entry$ (may not work for flaks but only one entry)
//     do i need member? NO! used to display and edit (copied from member-edit)
//        ==> probably should change name from entry-fhoto-edit to entry-photo
//     do I need user?  Yes, add username & userId to fhoto file
//        -- so also keep account service
//     NOT need host-listener (post will be automatic)

  ngOnInit(): void {

    this.entryOut = this.entry;
    this.placeOut = this.place;
    console.log('ENTRY-FHOTO-EDIT to print entry (make sure values ok) : ', this.entry )

    this.fhotoService.getFhotoEntryId(this.entry.id)
          .pipe(
              startWith([]),
              filter(fhotos => fhotos.length > 0),
              takeUntil(this.ngUnsubscribe)
          )
          .subscribe(result => {
      this.fhotos = result;
      console.log('ENTRY-FHOTO-EDIT load entry FHOTOS !! OBJECT : ', this.fhotos )
    })


    // this.entryService.currentEntry$.pipe(take(1)).subscribe(entryOne => this.entry$ = entryOne);
    // console.log('entry fhoto edit  entry$ ', this.entry$ )
    // console.log(' entry$.id : ', this.entry$.id);

    // this.loadFhoto();

    // this.route.data.subscribe(data => {  // uses resolver entry-fhoto.resolver  01-02-21
    //   this.entry = data.entry;
    //   console.log('In entry-fhoto-edit at init, after route : ', data)    // brings entry object
    //   console.log('In entry-fhoto-edit at init, this.entry  : ', this.entry)    // brings entry object
    // });

  }

ngOnDestroy() {
  this.ngUnsubscribe.next();
  this.ngUnsubscribe.complete();
}


  loadFhoto() {
    this.fhotoService.getFhotoEntryId(this.entry.id).subscribe(result => {
      this.fhotos = result;
      console.log('ENTRY-FHOTO-EDIT load entry FHOTOS !! OBJECT : ', this.fhotos )
    })
  }





  // becomes post for new photos and update for old photos
  // updateFhoto() {
  //   this.fhotoService.updatefhoto(this.member).subscribe(() => {
  //     this.toastr.success('Profile updated successfully');
  //     this.editForm.reset(this.member);
  //   })
  // }


}
