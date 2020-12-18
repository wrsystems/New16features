// copied from jform and modified with Input Output to match entry-form 12-14
import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entry } from '../../_models/entry';


// import custom validator to validate that password and confirm password fields match
// import { MustMatch } from './_helpers/must-match.validator';

    // export class Expertise {  // right after import
    //     subject: string;
    //     content: string;
    //     starRating: string;
    //     useAnomy: string;
    // }

@Component({
  selector: 'app-entry-message',
  templateUrl: './entry-message.component.html',
  styleUrls: ['./entry-message.component.css']
})

export class EntryMessageComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  strEntryIntoObj: Entry;

  @Input() entry: Entry; // decorate the property with @Input()
  @Output() newEntryEvent = new EventEmitter<Entry>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({

        subject: ['', Validators.required],
        content: ['', Validators.required],
        starRating: ['', Validators.required],
        useAnony: [false, Validators.requiredTrue]
      });
  }

    // ***************************************************
    // method to send data back to parent - - entry-list
    addNewEntry() {
      this.submitted = true;
      var ents =  JSON.stringify(this.registerForm.value);
      // console.log('entry-message ents   ', ents);

      this.strEntryIntoObj = JSON.parse(ents);
      // console.log('Its working !! ', this.strEntryIntoObj);

      // Object.assign ( {this.entry}, this.strEntryIntoObj)  // not work
      // this.newEntryEvent.emit(this.entry);  // not work as no values moved into

      this.newEntryEvent.emit(this.strEntryIntoObj);
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

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
