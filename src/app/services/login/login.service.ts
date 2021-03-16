import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Credentials } from './dto/credentials';
import { TokenResponse } from './dto/tokenResponse';
import { constants } from 'src/constants/constants';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = environment.apiBaseUrl + '/login';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private router: Router) { }

  logIn(credentials: Credentials): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.baseUrl, credentials, this.httpOptions);
  }

  setToken(token: string): void {
    localStorage.setItem(constants.TOKEN_KEY, token);
  }

  getToken(): string {
    const token = localStorage.getItem(constants.TOKEN_KEY);
    return token;
  }

  setUsername(username: string): void {
    localStorage.setItem(constants.USERNAME_KEY, username);
  }

  getUsername(): string {
    const username = localStorage.getItem(constants.USERNAME_KEY);
    return username;
  }


  doInternalLogin(): void {
    const token: string = this.getToken();
    const username: string = this.getUsername();
    if (token && token.length > 0 && username && username.length > 0) {
      this.router.navigateByUrl('/tabs');
    }
  }

  redirectToLogin(): void {
    const token: string = this.getToken();
    if (!token || token.length === 0) {
      this.logOut();
    }
  }

  logOut(): void {
    localStorage.removeItem(constants.TOKEN_KEY);
    localStorage.removeItem(constants.USERNAME_KEY);
    this.router.navigateByUrl('/home');
  }

}
