import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Flak } from '../_models/flak';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class FlakService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getFlaks(pageNumber, pageSize, container) {
    // console.log('Flak Service called with pagenation ');
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    return getPaginatedResult<Flak[]>(this.baseUrl + 'flaks', params, this.http);
  }

  getFlakThread(username: string) {
    return this.http.get<Flak[]>(this.baseUrl + 'flaks/thread/' + username);
  }

  sendFlak(username: string, content: string) {
    return this.http.post<Flak>(this.baseUrl + 'flakss', {recipientUsername: username, content})
  }

  deleteFlak(id: number) {
    return this.http.delete(this.baseUrl + 'flaks/' + id);
  }
}
