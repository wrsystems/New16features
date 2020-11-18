// 11/17 Sridhar is source of base code
// 11/17 copied in entrys-form (which is edited from neil register)

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntryService } from '../../_services/entry.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrys-try',
  templateUrl: './entrys-try.component.html',
  styleUrls: ['./entrys-try.component.css']
})

// from form -- from neil register
// export class EntrysFormComponent implements OnInit {
//   @Output() cancelRegister = new EventEmitter();
//   entryForm: FormGroup;
//   maxDate: Date;
//   validationErrors: string[] = [];


  // original from try -- original -- this is what we are editing for our result
export class EntrysTryComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  entryForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  // below code copied to initiate
  //  registerForm = new FormGroup({
  //   fullName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
  //   emailAddress: new FormControl('', [Validators.pattern('[a-zA-Z]*')]),
  //   password: new FormControl('', [Validators.required]),
  //   termsConditions: new FormControl('', [Validators.required])
  // });

  constructor(private entryService: EntryService, private toastr: ToastrService,
    // tslint:disable-next-line: align
    private fb: FormBuilder, private router: Router) { }

    ngOnInit(): void {
      this.intitializeForm();
    }

  intitializeForm() {

  this.entryForm = this.fb.group({
    // registerForm = new FormGroup({
      subject: ['', Validators.required],
      content: ['', Validators.required],
      orgname: ['', Validators.required]
    });
  }
    // this.entryForm = this.fb.group({

    //   subject: ['', Validators.required],
    //   content: ['', Validators.required],
    //   // useAnony: ['male'],
    //   // orgId: ['', Validators.required],
    //   OrgName: ['', Validators.required]
    // });

  postEntry() {
    console.log(this.entryForm.value);

    this.entryService.postEntry(this.entryForm.value).subscribe(response => {
        console.log('Got to line after postEntry');
        this.router.navigateByUrl('/members');
      }, error => {
        this.validationErrors = error;
      });
    }


  cancel() {
    this.cancelRegister.emit(false);
  }

}

// all below from neil register

  // constructor(private entryService: EntryService, private toastr: ToastrService,
  //   // tslint:disable-next-line: align
  //   private fb: FormBuilder, private router: Router) { }

  // ngOnInit(): void {
  //   this.intitializeForm();
  //   this.maxDate = new Date();
  //   this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  // }

  // intitializeForm() {
  //   this.entryForm = this.fb.group({
  //     subject: ['', Validators.required],
  //     content: ['', Validators.required],
  //     // useAnony: ['male'],
  //     // orgId: ['', Validators.required],
  //     OrgName: ['', Validators.required]
  //   });
  // }

  // postEntry() {}

  // {
  //   this.entryService.postEntry(this.entryForm.value).subscribe(response => {
  //     this.router.navigateByUrl('/members');
  //   }, error => {
  //     this.validationErrors = error;
  //   });
  // }

  // cancel() {
  //   this.cancelRegister.emit(false);
  // }
// }
