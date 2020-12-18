// 11/13 copied from flak-home to get started
// 12-06 code is used is called by router then calls entrys-try and print record from db hard coded

import { Component, OnInit } from '@angular/core';
import { Entry } from '../../_models/entry';
import { EntryService } from '../../_services/entry.service';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrys-list',
  templateUrl: './entrys-list.component.html',
  styleUrls: ['./entrys-list.component.css']
})

export class EntrysListComponent implements OnInit {


  entrys: any;
  // entrys: Entry[];
  // entry: Entry[] = [];
  subject = 'Subject1';
  listbutton = false;
  noMatch: string;

  constructor(private entryService: EntryService, private router: Router) { }

  ngOnInit(): void {
    this.listEntry();
  }

  // this.entryService.getEntrySubject(this.subject).subscribe(entry => {

  listEntry() {
    this.entryService.getEntrySubject(this.subject).subscribe(result => {
        // this.noMatch = '';
        this.entrys = result;
        console.log('I am here', this.subject );
        console.log('here is the array ', this.entrys );
        console.log(' Length ', this.entrys.length );
        // console.log(' Id ', this.entrys.id);
        // console.log(' Content ', result.content);

        // guess the console log is happening before async so not values

        // for (let entry = 0; entry < this.entrys.length; entry++) {
        //   console.log( entry['content'] );
        // }

        // function exerciseOne(result ) {
        //   result.forEach(entry => console.log(entry));
        // }

        // console.log('Now after function excerciseOne' );

        // BE SURE TO ENABLE THIS LATER 12/7
        // this.router.navigateByUrl('/members');


    // for the net 12/8 as example with array names
        // function exerciseOne(names) {
        //   names.forEach(name => console.log(name));
        // }
        // exerciseOne(["Jack", "Joe", "John", "Bob"]);

        // set values to Entry[] somehow
      // , Error {
      //   this.noMatch = 'No match for that subject name, try again';
      //   console.log('Did not find subject ');
      // }
  });


    // from flak-home
  // loadFlaks() {
    // this.loading = true;
  //   this.flakService.getFlaks(this.pageNumber, this.pageSize, this.container).subscribe(response => {
  //     this.flaks = response.result;
  //     this.pagination = response.pagination;
  //     this.loading = false;
  //   });
  // }

  // flak-detail
  // loadMessages() {
  //   this.messageService.getMessageThread(this.member.username).subscribe(messages => {
  //     this.messages = messages;
  //   })
  // }

  // this.entryService.getEntrySubject(this.subject).subscribe(result => {
  //   if (result) {

  // source: C:\Users\Admin\Desktop\Morgan Angular\lets-get-lunch-code-ng7\chapter-23\
  //   lets-get-lunch\src\app\services\comments\comments.service.ts
  // C:\Users\Admin\Desktop\Morgan Angular\lets-get-lunch-code-ng7\chapter-23\
  //    lets-get-lunch\src\app\comment-create\comment-create.component.ts

  // fetchComments() {
  //   this.commentsService.getEventComments(this.eventId).subscribe(res => {
  //     if (res) {
  //       this.noComments = '';
  //       this.userComment = '';
  //       this.comments = res;
  //     } else {
  //       this.noComments = 'No comments exist for this event.';
  //     }
  //   });
  // }

  // getEventComments(eventId: string): Observable<Comment[]> {
  //   return this.http.get<Comment[]>(this.API + '/comments/event/' +
  //                                   eventId);

  // is a post
  // login(model: any) {
  //   return this.http.post(this.baseUrl + 'account/login', model).pipe(
  //     map((response: User) => {
  //       const user = response;
  //       if (user) {
  //         this.setCurrentUser(user);
  //       }
  //     })
  //   )
  // }

  // end class below

}
}
