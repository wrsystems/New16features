import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Entry } from '../_models/entry';


import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EntryService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEntrySubject(subject: string) {
    return this.http.get<Entry[]>(this.baseUrl + 'entrys/subject/' + subject);
  }

  // postEntry(model: any) {
  //   return this.http.post(this.baseUrl + 'entrys', model);
  // }

  postEntry(model: any) {
    return this.http.post(this.baseUrl + 'entrys', model).pipe(
      map((user: Entry) => {
        if (user) {
          console.log('In Entry Service, apparently not null or void')
        //  this.setCurrentUser(user);
        }
      })
    );
  }

  // getMessageThread(username: string) {
  //   return this.http.get<Message[]>(this.baseUrl + 'messages/thread/' + username);
  // }

  // getEventComments(eventId: string): Observable<Comment[]> {
  //   return this.http.get<Comment[]>(this.API + '/comments/event/' +
  //                                   eventId);

  // sendFlak(username: string, content: string) {
  //   return this.http.post<Flak>(this.baseUrl + 'flakss', {recipientUsername: username, content})
  // }

  // deleteFlak(id: number) {
  //   return this.http.delete(this.baseUrl + 'flaks/' + id);
  // }
}
