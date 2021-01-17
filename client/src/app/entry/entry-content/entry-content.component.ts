import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entry } from '../../_models/entry';
import { EntryService } from '../../_services/entry.service';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';
import { User } from '../../_models/user';  // brought in to get username, probably better solution
import { Router } from '@angular/router';
import { Place } from '../../_models/place';
import { PlaceService } from '../../_services/place.service';

@Component({
  selector: 'app-entry-content',
  templateUrl: './entry-content.component.html',
  styleUrls: ['./entry-content.component.css']
})

export class EntryContentComponent implements OnInit {

  @Input() place: Place;
  @Output() entry: Entry;
  @Output() placeOut: Place

  entryOne: Entry = {'id': 0, 'subject': '', 'starRating': '', 'content': '', 'useAnony': false,
      'useEmail': false, 'usePhone': false, 'useAddress': false, 'useAll': false,
      'placeId': '', 'formSubmitted': false, 'dateCreated': '2001-02-02', 'dateSentToFlak': '2001-01-01',
      'orgId': 1, 'orgName': 'No Org Name Yet, set to id one', 'userId': 1, 'userName': '',
      'sentToFlak': false, 'userDeleted': false };

  registerForm: FormGroup;
  submitted = false;
  user$: User;
  strEntryIntoObj: Entry;
  placeOne: Place;
  doneWithPost = false;

  // @Input() entry: Entry; // decorate the property with @Input()
  // @Output() newEntryEvent = new EventEmitter<Entry>();

  constructor(private formBuilder: FormBuilder, private entryService: EntryService,
    private accountService: AccountService, private router: Router, private placeService: PlaceService )
     {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user$ = user);
    }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({

        subject: ['', Validators.required],
        content: ['', Validators.required],
        starRating: ['', Validators.required],
        useAnony: [false, Validators.requiredTrue]
      });
  }

    addNewEntry() {

      this.submitted = true;
      var ents =  JSON.stringify(this.registerForm.value);
      // console.log('entry-message ents   ', ents);

      this.strEntryIntoObj = JSON.parse(ents);
      // console.log('Its working !! ', this.strEntryIntoObj);

      // Object.assign ( {this.entry}, this.strEntryIntoObj)  // not work
      // this.newEntryEvent.emit(this.entry);  // not work as no values moved into

      this.addEntry();
      var ents2 = JSON.stringify(this.entryOne);
      this.strEntryIntoObj = JSON.parse(ents2);

      // this.newEntryEvent.emit(this.strEntryIntoObj);
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }


    // copied from ENTRY-HOME 01-09

    addEntry() {

    this.entryOne.sentToFlak = false;
    this.entryOne.formSubmitted = true;
    // this.entryOne.placeId = this.placeOne.placeId;  // was set to "NEW"
    // this.entryOne.orgName = this.placeOne.gname;
    // this.readCurrentUser()  // dow done in controller 12-18
    this.entryOne.userName = this.user$.username;     // check to see if userid set in controller
    // this.entryOne.subject = entry.subject;
    // console.log('entry-list subject', this.entryOne.subject );

    Object.assign( this.entryOne, this.strEntryIntoObj);

      this.entryService.addEntry(this.entryOne)
        .subscribe(data => {
          this.entryOne.id = data;
          // console.log('ENTRY-CONTENT entry POST with the retreived entry-id value TO BE SECOND NOW !!!! :', this.entryOne);
        });

        this.moveOn();
    }

    realUpdatePlace() {

      // updates place which is an @Input from ENTRY-GOOGLE
        this.placeOne = this.place;
        this.place.entryId = this.entryOne.id;
        this.placeOne.entryId = this.entryOne.id;

        this.placeService.updatePlace(this.placeOne).subscribe( ()=> {
        });
        this.doneWithPost = true;
        console.log('ENTER-CONTENT gplace UPDATE by adding entry-id :', this.placeOne)
    }

    moveOn() {
      this.entry = this.entryOne;
      this.placeOut = this.place;
      this.doneWithPost = true;  // note if used realUpdatePlace the comment this one out
      console.log('ENTRY-CONTENT -- right addEntry call in the moveon() method ', this.entryOne)
      // this.realUpdatePlace();
      // this.router.navigateByUrl('/fhoto');
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        // display form values on success
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));

        this.addNewEntry();  // go to the Output method
    }

    onReset() {
        this.submitted = false;
        this.registerForm.reset();
    }

};
