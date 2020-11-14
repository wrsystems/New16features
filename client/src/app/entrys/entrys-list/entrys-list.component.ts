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

  entry: Entry;

  listbutton = false;

  constructor(private entryService: EntryService) { }

  ngOnInit(): void {
  }

  listEntry(id: string) {
    this.entryService.getEntrySubject(id).subscribe(() => {
      this.entry.splice(this.entry.findIndex(e => e.id === id), 1);
    });
  }

  //flak-detail
  loadMessages() {
    this.messageService.getMessageThread(this.member.username).subscribe(messages => {
      this.messages = messages;
    })
  }

  // is a post
  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  // end class below
}






