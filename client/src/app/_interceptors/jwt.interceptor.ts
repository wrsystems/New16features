import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';
import { take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  // bring in account service which is injected
  // our current user is an observable, need to get current user outside of that observable
  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: User;

    // need to subscribe to get what is inside the observable
    // by using pipe & take we are saying we are done after one, and thus unsubscribed
    // interceptors are always around until we close our application.
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
    }

  // what this will do is to attach our token to every request to the sqlserver
  // note backticks and space between Bearer and token
  // if currentUser is null, then nothing happens

    return next.handle(request);
  }
}
