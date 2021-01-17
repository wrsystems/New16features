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

  @Input() entry: Entry;
  @Output() entryOut: Entry;
  @Output() flakOut: Flak;

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


  validationErrors: string[] = [];

  constructor(private flakService: FlakService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.entryOut = this.entry;
    this.flakForm = this.formBuilder.group({

        subject: ['', Validators.required],
        content: ['', Validators.required],
        userCreated: [false, Validators.requiredTrue]
      });
      // console.log('FLAK-CONTENT - Print only the passed Entry value for Id : ', this.PassedEntry.id);
  }

    // convenience getter for easy access to form fields
    get f() { return this.flakForm.controls; }

  onSubmit() {
        this.submitted = true;

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

    this.submitted = true;
    var ents =  JSON.stringify(this.flakForm.value);
      // console.log('FLAK-CONTENT - flakform after stringify - ents   ', ents);
    this.flak = JSON.parse(ents);
    this.flak.entryId = this.PassedEntry.id;
    this.flak.userId = this.PassedEntry.userId;
    this.flak.userName = this.PassedEntry.userName;
    this.flak.orgId = this.PassedEntry.orgId;
    this.flak.orgName = this.PassedEntry.orgName;
    Object.assign( this.flakOne, this.flak);
      // console.log('FLAK-CONTENT - flak-messages flakOne : ', this.flakOne );

    this.flakOut = this.flakOne;
    this.postFlak();

    // alert("Flak Saved");
  }

  postFlak() {
    // console.log(this.flakForm.value);  take out because the following three lines worked 12-06
    // console.log(' forms object in postFlak ', this.flakOne);

    this.flakService.postFlak(this.flakOne).subscribe(response => {
        // console.log('FLAK-CONTENT - Got to line after postFlak');
        // this.router.navigateByUrl('/members');
      }, error => {
        this.validationErrors = error;
      });
  }

};
