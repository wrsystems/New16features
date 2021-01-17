// copied from item-detail 12-9
// copied from angular.io  dynamic components

import { Component, Input, OnInit } from '@angular/core'; // First, import Input
import { Entry } from '../../_models/entry';
import { Place } from '../../_models/place';
import { EntryService } from '../../_services/entry.service';
import { PlaceService } from '../../_services/place.service';
import { User } from '../../_models/user';  // brought in to get username, probably better solution
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-entry-home',
  templateUrl: './entry-home.component.html',
  styleUrls: ['./entry-home.component.css']
})

export class EntryHomeComponent {

  entryOne: Entry = {'id': 0, 'subject': '', 'starRating': '', 'content': '', 'useAnony': false,
      'useEmail': false, 'usePhone': false, 'useAddress': false, 'useAll': false,
      'placeId': '', 'formSubmitted': false, 'dateCreated': '2001-02-02', 'dateSentToFlak': '2001-01-01',
      'orgId': 1, 'orgName': 'No Org Name Yet, set to id one', 'userId': 1, 'userName': '',
      'sentToFlak': false, 'userDeleted': false };

  placeOne: Place = {'id': 0,'entryId': 0, 'placeId': '', 'gname': '', 'fullAddress': '', 'phone': '',
      'fullDescription': '', 'streetNumber': '', 'street': '', 'city': '',
      'postCode': '', 'state': '', 'country': '', 'countryShort': '', 'placeUrl': '',
      'formSubmitted': false, 'useOrg': false, 'orgId': 1, 'orgName': '', 'userId': 0, 'userName': '',
      'match': 'NEW'}

  passedEntry: Entry;  // single object
  entry$: Entry;  // for testing
  passedPlace: Place;  // same as for message
  validationErrors: string[] = [];
  user$: User;
  localValue = '';  // these three variable are to get username from local storage
  userObj: User;
  myUserName: any;
  postId = 0;


  // added 12-16
  constructor(private entryService: EntryService, private placeService: PlaceService,
    private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user$ = user);
}


  ngOnInit() {
    this.passedEntry = this.entryOne;
    this.passedPlace = this.placeOne;  // same as for message
  }

          // ************
          // Entrys logic  -- FIRES SECOND BECAUSE OF ORDER IN HTML,
          //                  THEN CALLS THIRD TO UPDATE PLACE WITH EntryID
          // ************

  // Incoming emitted data stream FROM ENTRY-MESSAGE ************
  // method called from entry-list html involking entry-message
  updateEntry(entry: Entry) {

    console.log('ENTRY_HOME @ UpdateEntry Start Going To Post Place from updateEntry')
    // console.log('entry-list final result', entry );
    this.entryOne.sentToFlak = false;
    this.entryOne.formSubmitted = true;
    this.entryOne.placeId = this.placeOne.placeId;  // was set to "NEW"
    this.entryOne.orgName = this.placeOne.gname;
    // this.readCurrentUser()  // dow done in controller 12-18
    this.entryOne.userName = this.user$.username;     // check to see if userid set in controller
    // this.entryOne.subject = entry.subject;
    // console.log('entry-list subject', this.entryOne.subject );

    Object.assign( this.entryOne, entry);

    // console.log('entry-list entryOne', this.entryOne );
    // this.postEntry();

    this.addEntry();   // do entry post again (first done in entry-context)

    this.placeOne.entryId = this.entryOne.id;
    console.log('Before postPlace value of placeOne.entryId id :', this.placeOne.entryId);

    this.postPlace();
    // this.addEntry();   // does post

    // alert("Entry Saved");
  }


  addEntry() {
    this.entryService.addEntry(this.entryOne)
      .subscribe(data => {
        this.entryOne = data;
        console.log('In ENTRY HOME WITH addEntry method MUST BE FIRST !!!! :', data);
        // this.refreshPeople();
      });

      // this.postPlace();
      // this.realUpdatePlace();
  }

  postEntry() {
    // console.log(this.entryForm.value);  take out because the following three lines worked 12-06
    console.log(' forms object in postEntry BEFORE POST ', this.entryOne);

    this.entryService.postEntry(this.entryOne).subscribe(response => {

      // this.postId = response.next(this.entryOne.id);

      // this.currentEntrySource.next(entry);
      // next: data => {
      //   this.postId = data.id;
      //   console.log ('ENTRY HOME AFTER PORT, postId : ', this.postId);
      // }

      // this.entryOne = response;  // not work, says void
        // console.log('Got to line after postEntry');
        // this.router.navigateByUrl('/members');
      }, error => {
        this.validationErrors = error;
      });

      // 01-07-21 new method to get entryId into gplaces table
      console.log(' forms object in postEntry AFTER POST ', this.entryOne);

      // this.entryService.currentEntry$.pipe(take(1)).subscribe(entryOne => this.entry$ = entryOne);
      // console.log('ENTRY-DETAIL  entry$ ', this.entry$ )

      // this.postPlace();

      // this.realUpdatePlace();
  }
          // ************
          // Gplace logic -- FIRES FIRST BECAUSE OF ORDER IN HTML
          // ************

  updatePlace(place: Place) {

    Object.assign( this.placeOne, place);
    this.placeOne.formSubmitted = true;
    this.entryOne.sentToFlak = true;
    // this.entryOne.formSubmitted = true;
    // this.passedEntry.formSubmitted = true;

      // console.log('entry-list place', place );

      // this.postPlace();
  }

  postPlace() {
    // console.log(this.placeForm.value);  take out because the following three lines worked 12-06
    // console.log(' forms object in postPlace ', this.placeOne);
    this.placeOne.entryId = this.entryOne.id;

    this.placeService.postPlace(this.placeOne).subscribe(response => {
        // console.log('Got to line after postPlace');
        // this.router.navigateByUrl('/members');
      }, error => {
        this.validationErrors = error;
      });
      console.log('ENTER-HOME POST To Add entry-id to Gplace MUST BE LAST !!!!', this.placeOne)
      console.log('We are done with ENTRY-HOME')
  }
          // ************
          // Gplace Update logic -- FIRES THIRD AFTER BEING CALLED FROM updateEntry()
          // ************

  // VERY IMPORTANT method. Need to add entryId to place records
  //     Need to: read entry record where entryId = 0 (should only be the one)
  //     Then: read place record where entryId = 0 and update
  // copy new value from Entry which is in memory.

  realUpdatePlace() {


    // this below will not work in this case for whatever reason, looks like must be in another component
    // this.entryService.currentEntry$.pipe(take(1)).subscribe(entryOne => this.entry$ = entryOne);
    // console.log('ENTRY-DETAIL  entry$ ', this.entry$ )

      this.placeOne.entryId = this.entryOne.id;

      this.placeService.updatePlace(this.placeOne).subscribe( ()=> {
      });
      console.log('ENTER-HOME Update To Add entry-id to Gplace', this.placeOne)
  }


  onSubmit() {
  }

  onReset() {
  }

  // This code works, but I replaced need for it with lookup logic inside controller  12-18
  // Here is my solution to get username from localStorage -- crude, needs to be redone
  // readCurrentUser() {
  //   this.localValue = localStorage.getItem('user');  // just use the key (user) to get the string
  //   console.log(' localvalue : ', this.localValue);
  //   this.userObj = JSON.parse(this.localValue);
  //   console.log(' From localStorage Object :', this.userObj)  // convert string into object
  //   // Here is the value we need
  //   this.myUserName = this.userObj.username
  //   console.log('This this is the username : ', this.myUserName);
  //   //  obj.birth = new Date(obj.birth);  // convert data string into date
  // }

};
