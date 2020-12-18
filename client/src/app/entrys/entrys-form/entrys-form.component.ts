// 11/16 copied from register.ts
// 12-06 code not now used

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntryService } from '../../_services/entry.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrys-form',
  templateUrl: './entrys-form.component.html',
  styleUrls: ['./entrys-form.component.css']
})

export class EntrysFormComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  entryForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  constructor(private entryService: EntryService, private toastr: ToastrService,
    // tslint:disable-next-line: align
    private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.intitializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  intitializeForm() {
    this.entryForm = this.fb.group({

      subject: ['', Validators.required],
      content: ['', Validators.required],
      // useAnony: ['male'],
      // orgId: ['', Validators.required],
      OrgName: ['', Validators.required]
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null : {isMatching: true};
    };
  }

  postEntry() {}

  // {
  //   this.entryService.postEntry(this.entryForm.value).subscribe(response => {
  //     this.router.navigateByUrl('/members');
  //   }, error => {
  //     this.validationErrors = error;
  //   });
  // }

  cancel() {
    this.cancelRegister.emit(false);
  }

}

