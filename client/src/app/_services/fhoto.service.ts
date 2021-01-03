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


  getFlakUserName(username: string) {
    return this.http.get<Fhoto[]>(this.baseUrl + 'flak/username/' + username);
  }

  // 12-30 new & in controller
  getFhotoEntryId(id: number) {
    return this.http.get<Fhoto>(this.baseUrl + 'fhoto/entry/' + id);
  }

  sendFlak(username: string, content: string) {
    return this.http.post<Fhoto>(this.baseUrl + 'flak', {recipientUsername: username, content})
  }

  deleteFlak(id: number) {
    return this.http.delete(this.baseUrl + 'flak/' + id);
  }

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

}
