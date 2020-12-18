// copied from item-detail 12-9
// copied from angular.io  dynamic components

import { Component, Input, OnInit } from '@angular/core'; // First, import Input
import { Entry } from '../../_models/entry';
import { Place } from '../../_models/place';
import { EntryService } from '../../_services/entry.service';
import { User } from '../../_models/user';  // brought in to get username, probably better solution

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})

export class EntryListComponent {

  entryOne: Entry = {'subject': '', 'starRating': '', 'content': '', 'useAnony': false,
      'useEmail': false, 'usePhone': false, 'useAddress': false, 'useAll': false,
      'placeId': '', 'formSubmitted': false, 'dateCreated': '2001-02-02', 'dateSentToFlak': '2001-01-01',
      'orgId': 1, 'orgName': 'No Org Name Yet, set to id one', 'userId': 1, 'userName': '',
      'sentToFlak': false, 'userDeleted': false };

  placeOne: Place = {'placeId': '', 'gname': '', 'fullAddress': '', 'phone': '',
      'fullDescription': '', 'streetNumber': '', 'street': '', 'city': '',
      'postCode': '', 'state': '', 'country': '', 'countryShort': '', 'placeUrl': '',
      'formSubmitted': false, 'useOrg': false, 'orgId': 1}

  passedEntry: Entry;  // single object
  passedPlace: Place;  // same as for message
  validationErrors: string[] = [];

  localValue = '';  // these three variable are to get username from local storage
  userObj: User;
  myUserName: any;

  // added 12-16
  constructor(private entryService: EntryService) { }

  ngOnInit() {
    this.passedEntry = this.entryOne;
    this.passedPlace = this.placeOne;  // same as for message
  }

  // Incoming emitted data stream FROM ENTRY-MESSAGE ************
  // method called from entry-list html involking entry-message
  updateEntry(entry: Entry) {
    // console.log('entry-list final result', entry );
    this.entryOne.sentToFlak = false;
    this.entryOne.formSubmitted = true;
    this.entryOne.placeId = this.placeOne.placeId;
    this.readCurrentUser()
    this.entryOne.userName = this.myUserName;
    // this.entryOne.subject = entry.subject;
    // console.log('entry-list subject', this.entryOne.subject );

    Object.assign( this.entryOne, entry);

    console.log('entry-list entryOne', this.entryOne );
    this.postEntry();
    // alert("Entry Saved");
  }

  postEntry() {
    // console.log(this.entryForm.value);  take out because the following three lines worked 12-06
    console.log(' forms object in postEntry ', this.entryOne);

    this.entryService.postEntry(this.entryOne).subscribe(response => {
        console.log('Got to line after postEntry');
        // this.router.navigateByUrl('/members');
      }, error => {
        this.validationErrors = error;
      });
    }

  updatePlace(place: Place) {

    Object.assign( this.placeOne, place);
    this.placeOne.formSubmitted = true;
    this.entryOne.sentToFlak = true;
    // this.entryOne.formSubmitted = true;
    // this.passedEntry.formSubmitted = true;

      console.log('entry-list place', place );
  }

  onSubmit() {
    }

  onReset() {
    }

  // Here is my solution to get username from localStorage -- crude, needs to be redone
  readCurrentUser() {
    this.localValue = localStorage.getItem('user');  // just use the key (user) to get the string
    console.log(' localvalue : ', this.localValue);
    this.userObj = JSON.parse(this.localValue);
    console.log(' From localStorage Object :', this.userObj)  // convert string into object

    // Here is the value we need
    this.myUserName = this.userObj.username
    console.log('This this is the username : ', this.myUserName);

    //  obj.birth = new Date(obj.birth);  // convert data string into date

  }

};
