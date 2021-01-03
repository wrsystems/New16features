import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Flak } from '../_models/flak';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlakService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // 12-28
  getFlakUserName(username: string) {
    return this.http.get<Flak[]>(this.baseUrl + 'flak/username/' + username);
  }

  // 12-28
  getFlakId(id: number) {
    return this.http.get<Flak>(this.baseUrl + 'flak/id/' + id);
  }

  sendFlak(username: string, content: string) {
    return this.http.post<Flak>(this.baseUrl + 'flak', {recipientUsername: username, content})
  }

  deleteFlak(id: number) {
    return this.http.delete(this.baseUrl + 'flak/' + id);
  }

  postFlak(model: any) {
    return this.http.post(this.baseUrl + 'flak', model).pipe(
      map((user: Flak) => {
        // console.log(' bbbbb', user)
        if (user) {
          // console.log('In Entry Service, apparently not null or void')
        //  this.setCurrentUser(user);
        }
      })
    );
  }

}
