import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from './dto/card';
import { Movement } from './dto/movement';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  private baseUrl = environment.apiBaseUrl + '/cards';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.baseUrl, this.httpOptions);
  }

  getCardMovements(productNumber:  string): Observable<Movement[]> {
    const endpoint = this.baseUrl + '/movements/' + productNumber;
    return this.http.get<Movement[]>(endpoint, this.httpOptions);
  }
}
