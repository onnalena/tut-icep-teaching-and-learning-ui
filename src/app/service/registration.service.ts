import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Registration } from '../model/registration';
import {Observable} from 'rxjs';
import {environment as registrationUrl} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) {
  }

  public retrieveUserDetails(accessID: string): Observable<Registration> {
    return this.http.get<Registration>(registrationUrl.backendApi + 'user/retrieve-details/' + accessID);
  }

  public saveUser(userRegistration: Registration): Observable<string> {
    return this.http.put<string>(registrationUrl.backendApi + 'user/create-password', userRegistration);
  }

  public updateUserDetails(userRegistration: Registration): Observable<Registration> {
    return this.http.put<Registration>(registrationUrl.backendApi + 'user/update-details', userRegistration);
  }
}
