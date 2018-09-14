import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  currentUser: any;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      const jwt = new JwtHelper();
      this.currentUser = jwt.decodeToken(token);
    }
  }

  login(credentials) {
    return this.http.post('/api/authenticate', JSON.stringify(credentials))
    .pipe(map(response => {
      console.log(response);
      // take a look at fake-backend to see what is being sent
      const result = response.json();

      if (result && result.token) {
        localStorage.setItem('token', result.token);
        const jwt = new JwtHelper();
        this.currentUser = jwt.decodeToken(localStorage.getItem('token'));
        return true;
      } else {
        return false;
      }
    }));
  }

  logout() {
    localStorage.remove('token');
    this.currentUser = null;
  }

  isLoggedIn() {
    return tokenNotExpired('token');
  }
  }

