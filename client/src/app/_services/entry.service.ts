import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Entry } from '../_models/entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEntrySubject(subject: string) {
    return this.http.get<Entry[]>(this.baseUrl + 'entrys/subject/' + subject);
  }

  // return this.http.get<Entry[]>(this.baseUrl + 'entrys/subject/' + subjecta);

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
