// 12-28 copied from entry-message for reactive form
// copied from jform and modified with Input Output to match entry-form 12-14
import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Flak } from '../../_models/flak';
import { FlakService } from '../../_services/flak.service';
import { Entry } from '../../_models/Entry';
import { User } from '../../_models/user';  // brought in to get username, probably better solution

@Component({
  selector: 'app-flak-content',
  templateUrl: './flak-content.component.html',
  styleUrls: ['./flak-content.component.css']
})

export class FlakContentComponent implements OnInit {

  flakOne: Flak = {'id': 0, 'subject': '', 'content': '', 'hasBeenRead': false, 'entryId': 0,
      'userCreated': false, 'userDeleted': false, 'orgCreated': false, 'orgDeleted': false,
      'fhotoAdded': false, 'dateCreated': '2001-02-02', 'dateFirstRead': '2001-01-01',
      'orgId': 1, 'orgName': 'No Org Name Yet, set to id one', 'userId': 1, 'userName': '' };

  flakForm: FormGroup;
  submitted = false;
  passedFlak: Flak;  // single object

  // strFlakIntoObj: Flak;
  flak: Flak;

  localValue = '';  // these three variable are to get username from local storage
  userObj: User;
  myUserName: any;

  @Input() PassedEntry: Entry; // decorate the property with @Input()

  // @Input() flak: Flak; // decorate the property with @Input()
  // @Output() newFlakEvent = new EventEmitter<Flak>();

  validationErrors: string[] = [];

  constructor(private flakService: FlakService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.flakForm = this.formBuilder.group({

        subject: ['', Validators.required],
        content: ['', Validators.required],
        userCreated: [false, Validators.requiredTrue]
      });
    console.log('Print passed Entry value for Id : ', this.PassedEntry.id);
  }

    // ***************************************************
    // method to send data back to parent - - entry-list
    // addNewFlak() {
    //   this.submitted = true;
    //   var ents =  JSON.stringify(this.flakForm.value);
    //   // console.log('entry-message ents   ', ents);

    //   this.strFlakIntoObj = JSON.parse(ents);
    //   // console.log('Its working !! ', this.strEntryIntoObj);

    //   this.newFlakEvent.emit(this.strFlakIntoObj);
    // }

    // convenience getter for easy access to form fields
    get f() { return this.flakForm.controls; }

  onSubmit() {
        this.submitted = true;
        console.log('got to onsubmit');

        // stop here if form is invalid
        if (this.flakForm.invalid) {
            return;
        }
        this.updateFlak();

        // display form values on success
        // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
        // this.addNewFlak();  // go to the Output method
    }

  onReset() {
        this.submitted = false;
        this.flakForm.reset();
    }

  // 12-28 from entry-messages

          // ************
          // Flaks logic - - bring in from flaks-message  12-18
          // ************

  // Incoming emitted data stream FROM FLAKS-MESSAGE ************
  // method called from reply-list html involking flaks-message

  updateFlak() {
    // console.log('reply-list final result', flak );
    // this.flakOne.orgName = this.placeOne.gname;
    // this.flakOne.userName = this.myUserName;       // 12-28 MAYBE NEED BELOW
    // this.entryOne.subject = entry.subject;
    // console.log('entry-list subject', this.entryOne.subject );

    this.submitted = true;
    var ents =  JSON.stringify(this.flakForm.value);
      // console.log('entry-message ents   ', ents);
    this.flak = JSON.parse(ents);
    this.flak.entryId = this.PassedEntry.id;
    this.flak.userId = this.PassedEntry.userId;
    this.flak.userName = this.PassedEntry.userName;
    this.flak.orgId = this.PassedEntry.orgId;
    this.flak.orgName = this.PassedEntry.orgName;
    Object.assign( this.flakOne, this.flak);
    console.log('flak-messages flakOne : ', this.flakOne );

    this.postFlak();

    // alert("Flak Saved");
  }

  postFlak() {
    // console.log(this.flakForm.value);  take out because the following three lines worked 12-06
    // console.log(' forms object in postFlak ', this.flakOne);

    this.flakService.postFlak(this.flakOne).subscribe(response => {
        console.log('Got to line after postFlak');
        // this.router.navigateByUrl('/members');
      }, error => {
        this.validationErrors = error;
      });
  }

};
