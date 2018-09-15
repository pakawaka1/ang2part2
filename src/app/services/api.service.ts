import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // update the apiURL as well.....

  // private apiUrl = 'https://jordomav.ngrok.io';
  private apiUrl = 'http://localhost:4200/api/authenticate';

  constructor(private http: Http) { }
  get(url) {
    return this.http.get(`${this.apiUrl}${url}`);
  }
  post(url, data) {
    return this.http.post(`${this.apiUrl}${url}`, data);
  }
}
