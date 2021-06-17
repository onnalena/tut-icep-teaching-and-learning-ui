import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Login} from '../model/login';
import {Observable} from 'rxjs';
import {environment as registrationUrl, environment as loginURL} from '../../environments/environment';
import {Registration} from '../model/registration';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedInUser: Registration;

  constructor(private http: HttpClient) {
    this.loggedInUser = new Registration('', '', '', '', '', '', '', '');
  }

  public retrieveUserDetails(accessID: string): Observable<Registration> {
    return this.http.get<Registration>(loginURL.backendApi + 'user/retrieve-details/' + accessID);
  }
  public loginUser(login: Login): Observable<Registration>{
    return this.http.put<Registration>(loginURL.backendApi + 'user/login-auth', login);
  }

  public setLoginUser(loggedInUser: Registration): void {
    this.loggedInUser = loggedInUser;
  }

  public getLoginUser(): Registration {
    return this.loggedInUser;
  }
}
