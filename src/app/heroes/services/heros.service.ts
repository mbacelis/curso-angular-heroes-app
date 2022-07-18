import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HerosService {

  constructor(private http: HttpClient) { }

  getHeroes() {
    return this.http.get("http://localhost:3000/heroes");
  }
}
