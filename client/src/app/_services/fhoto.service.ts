import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Fhoto } from '../_models/fhoto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FhotoService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }



  // 01-04-21 new & in controller
  getFhotoEntryId(id: number) {
    return this.http.get<Fhoto[]>(this.baseUrl + 'fhoto/entry/' + id);
  }

 // 01-15-21 new & in controller does not help problem, reverted back to above
 getFhotoEid(entryid: number) {
  return this.http.get<Fhoto[]>(this.baseUrl + 'fhoto/eid/' + entryid);
}

  // 01-05-21 new & in-controller
  deleteFhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'fhoto/delete-photo/' + photoId);
  }

  // 01-05-21 new PUT attempt
  updateFhoto(model: any) {
    return this.http.put(this.baseUrl + 'fhoto/', model).pipe(
      map((user: Fhoto) => {
        // console.log(' fhoto service - post', user)
        // if (user) {
        //   console.log('In fhoto Service, apparently not null or void')
        // }
      })
    );
  }


  // sendMessage(username: string, content: string) {
  //   return this.http.post<Message>(this.baseUrl + 'messages', {recipientUsername: username, content})
  // }



  // edited this function 12-30 & in controller
  postFhoto(model: any) {
    return this.http.post(this.baseUrl + 'fhoto', model).pipe(
      map((user: Fhoto) => {
        // console.log(' fhoto service - post', user)
        if (user) {
          console.log('In fhoto Service, apparently not null or void')
        //  this.setCurrentUser(user);
        }
      })
    );
  }


  // *******************************  not used *******************************

  getFlakUserName(username: string) {
    return this.http.get<Fhoto[]>(this.baseUrl + 'flak/username/' + username);
  }

  sendFlak(username: string, content: string) {
    return this.http.post<Fhoto>(this.baseUrl + 'flak', {recipientUsername: username, content})
  }

  deleteFlak(id: number) {
    return this.http.delete(this.baseUrl + 'flak/' + id);
  }

}
