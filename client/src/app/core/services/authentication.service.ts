import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from './../../constants/appConstants'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  endpoint = AppConstants.getBaseURL();

  constructor(private http: HttpClient) { }

  registerUser(userData) {
    return this.http.post(this.endpoint + '/register', userData);
  }
  loginUser(userData) {
    return this.http.post(this.endpoint + '/login', userData);
  }

}
