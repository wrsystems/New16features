import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Entry } from '../_models/entry';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EntryService {
  baseUrl = environment.apiUrl;
  private currentEntrySource = new ReplaySubject<Entry>(1);   // added 1-2-21
  currentEntry$ = this.currentEntrySource.asObservable();

  constructor(private http: HttpClient) { }

// added 12-24 from old flaks.service
  getEntrys(pageNumber, pageSize, container) {
    // console.log('Flak Service called with pagenation ');
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    return getPaginatedResult<Entry[]>(this.baseUrl + 'entrys', params, this.http);
  }

  // added 12-24 from old flaks.service
  getEntrysUsername(username: string) {
    return this.http.get<Entry[]>(this.baseUrl + 'entrys/username/' + username);
  }

  getEntryId(id: number) {
    return this.http.get<Entry>(this.baseUrl + 'entrys/id/' + id);
  }

  getEntrySubject(subject: string) {
    return this.http.get<Entry>(this.baseUrl + 'entrys/subject/' + subject);

    // specifys as []
    // return this.http.get<Entry[]>(this.baseUrl + 'entrys/subject/' + subject);

  }

  // postEntry(model: any) {
  //   return this.http.post(this.baseUrl + 'entrys', model);
  // }

  postEntry(model: any) {
    return this.http.post(this.baseUrl + 'entrys', model).pipe(
      map((entry: Entry) => {
        // console.log(' bbbbb', user)
        if (entry) {
          // console.log('In Entry Service, apparently not null or void')
        //  this.setCurrentUser(user);
        }
        this.currentEntrySource.next(entry);
        // console.log('Entry service Post return values :', entry);
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
