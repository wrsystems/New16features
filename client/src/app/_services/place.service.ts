import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Place } from '../_models/place';

import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class PlaceService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPlaceSubject(subject: string) {
    return this.http.get<Place>(this.baseUrl + 'gplaces/subject/' + subject);

    // specifys as []
    // return this.http.get<Entry[]>(this.baseUrl + 'entrys/subject/' + subject);

  }

  // postEntry(model: any) {
  //   return this.http.post(this.baseUrl + 'entrys', model);
  // }

  postPlace(model: any) {
    // console.log('In places.service at start of postIt ')
    return this.http.post(this.baseUrl + 'gplace', model).pipe(
      map((user: Place) => {
        // console.log(' pppppp ', user)
        if (user) {
          // console.log('In Place Service, apparently not null or void')
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
