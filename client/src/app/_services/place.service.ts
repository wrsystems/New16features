import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Place } from '../_models/place';

import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root'
})

export class PlaceService {
  baseUrl = environment.apiUrl;
  private currentPlaceSource = new ReplaySubject<Place>(1);   // added 1-2-21
  currentPlace$ = this.currentPlaceSource.asObservable();

  constructor(private http: HttpClient) { }

  // -1-14-21 CAN NOT GET THIS TO RETURN DATA TO ANGULAR, WORKS IN POSTMAN FINE
  getPlaceByEntityId(entityId: number) {
    return this.http.get<Place>(this.baseUrl + 'gplace/entity/' + entityId);
  }

  // -1-14-21 THIS IS VERSION USED TO retrieve place in reply-detail since entryId unique in Gplaces
  getPlaceById(entityId: number) {
    return this.http.get<Place>(this.baseUrl + 'gplace/eid/' + entityId);
  }

  getPlaceSubject(fullDescription: string) {
    return this.http.get<Place>(this.baseUrl + 'gplace/subject/' + fullDescription);
  }

  getPlacePlaceId(placeid: string) {
      return this.http.get<Place>(this.baseUrl + 'gplace/placeid/' + placeid);
  }

  // 01-07-21 new PUT attempt TRY On #21  -- 01-13-21 DIFFERENT CONTROLLER !!
  updatePlace(model: any) {
    return this.http.put(this.baseUrl + 'gplace21/', model).pipe(
      map((place: Place) => {
        // console.log(' place service - put', place)
        // if (place) {
        //   console.log('In place Service, apparently not null or void')
        // }
      })
    );
  }


    // specifys as []
    // return this.http.get<Entry[]>(this.baseUrl + 'entrys/subject/' + subject);


  // postEntry(model: any) {
  //   return this.http.post(this.baseUrl + 'entrys', model);
  // }

  postPlace(model: any) {
    return this.http.post(this.baseUrl + 'gplace', model).pipe(
      map((place: Place) => {
        // console.log(' pppppp ', user)
        if (place) {
          // console.log('In Place Service, apparently not null or void')
        //  this.setCurrentUser(user);
        // this.currentPlaceSource.next(place);
        }; // console.log('Entry service Post return values :', entry);
      })
    );
  }

  addPlace(place:Place): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    const body=JSON.stringify(place);
    // console.log('From PLACE SERVICE, JSON BODY :', body)
    return this.http.post(this.baseUrl + 'gplace', body, {'headers':headers})
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
