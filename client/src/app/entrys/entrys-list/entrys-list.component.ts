// 11/13 copied from flak-home to get started

import { Component, OnInit } from '@angular/core';
import { Entry } from '../../_models/entry';
import { EntryService } from '../../_services/entry.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-entrys-list',
  templateUrl: './entrys-list.component.html',
  styleUrls: ['./entrys-list.component.css']
})

export class EntrysListComponent implements OnInit {

  entrys: Entry[];
  // entry: Entry[] = [];
  subject = 'Subject1';
  listbutton = false;
  noMatch: string;

  constructor(private entryService: EntryService) { }

  ngOnInit(): void {
    this.listEntry();
  }

  // this.entryService.getEntrySubject(this.subject).subscribe(entry => {

  listEntry() {
    this.entryService.getEntrySubject(this.subject).subscribe(result => {
        // this.noMatch = '';
        this.entrys = result;
        console.log('I am here', this.subject );
        console.log(this.subject );
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
