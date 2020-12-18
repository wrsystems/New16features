import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';

@Component({
  selector: 'app-entry-jsontest',
  templateUrl: './entry-jsontest.component.html',
  styleUrls: ['./entry-jsontest.component.css']
})
export class EntryJsontestComponent implements OnInit {

  stringifiedData: any;
  parsedJson: any;

  localValue = '';
  userObj: User;
  myUserName: any;

  // Object Data
  myData = {
    name: "Bobby",
    qualification: "Highly",
    technology: "Angular"
  };

  ngOnInit() {

    // Object data
    console.log(this.myData);

    // Convert to JSON
    this.stringifiedData = JSON.stringify(this.myData);
    // console.log("With Stringify :" , this.stringifiedData);   // print for testing

     // Parse from JSON
    this.parsedJson = JSON.parse(this.stringifiedData);
    // console.log("With Parsed JSON :" , this.parsedJson);  // print for testing

    // this.readCurrentUser();
  }

  // methods not user, copied from account.service to help develop my approach
  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
  }
  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  // Here is my solution to get username from localStorage
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

}
