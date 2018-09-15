import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


// Add this for when we discuss hiding and showing routes
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUser: any;


  constructor(private http: Http, private router: Router) {

    // talk about this during.........
    const token = localStorage.getItem('token');
    if (token) {
      const jwt = new JwtHelper();
      this.currentUser = jwt.decodeToken(token);
    }
  }

  login(credentials) {
    return this.http.post('/api/authenticate', JSON.stringify(credentials))
    .pipe(map(response => {
      const result = response.json();
      if (result && result.token) {
        localStorage.setItem('token', result.token);
        const jwt = new JwtHelper();
        this.currentUser = jwt.decodeToken(localStorage.getItem('token'));
        console.log(result.token);
        return true;
      } else {
        return false;
      }
    }));
  }

  // add this when we talk about logout
  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
    this.router.navigateByUrl('/login');

  }

  // for when we talk about showing and hiding routes
  isLoggedIn() {

// add the tokenNotExpired function can be used to check whether a JWT exists in local storage, and if it does, whether it has expired or not. If the token is valid, tokenNotExpired returns true, otherwise it returns false.


    return tokenNotExpired();

    // const jwtHelper = new JwtHelper();
    // const token = localStorage.getItem('token');

    // if (!token) {
    //   return false;
    // }
    // const expirationDate = jwtHelper.getTokenExpirationDate(token);
    // const isExpired = jwtHelper.isTokenExpired(token);

    // console.log('Expiration', expirationDate);
    // console.log('isExpired', isExpired);
    // return !isExpired;
  }



  // for when we talk about showing and hidng routes based on a user's role

  get currentUsers() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const jwtHelper = new JwtHelper();

  }


  }

