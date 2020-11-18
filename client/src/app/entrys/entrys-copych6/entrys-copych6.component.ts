// 11/17 copied from ch6 valerio component register

import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-entrys-copych6',
  templateUrl: './entrys-copych6.component.html',
  styleUrls: ['./entrys-copych6.component.css']
})

export class EntrysCopych6Component implements OnInit {

   registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    emailAddress: new FormControl('', [Validators.pattern('[a-zA-Z]*')]),
    password: new FormControl('', [Validators.required]),
    termsConditions: new FormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit() {
  }

  register()
  {
    console.log(this.registerForm.value);
    console.log(this.registerForm.value);
  }

}

