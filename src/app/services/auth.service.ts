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

  constructor(private http: Http, private router: Router) {}
  login(credentials) {
    return this.http.post('/api/authenticate', JSON.stringify(credentials)).pipe(map(response => {
      console.log(response.json);
      const result = response.json();
      if (result && result.token) {
        localStorage.setItem('token', result.token);
        console.log(result.token);
          const jwt = new JwtHelper();
          this.currentUser = jwt.decodeToken(localStorage.getItem('token'));
        return true;
      } else {
        return false;
      }
    }));
  }

  // add this when we talk about logout
  logout() {
    // we need to remove the token from local storage. set the current user to null and then navigate back to the login component.
    localStorage.removeItem('token');
    this.currentUser = null;
    this.router.navigateByUrl('/login');

  }




  // for when we talk about showing and hiding routes


isLoggedIn() {
  return tokenNotExpired();
}



  // for when we talk about showing and hidng routes based on a user's role

  get currentUsers() {
    // get the token from local storage
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }
    // if we have a token, then we get the token and decode it to get all token's properties.  We can use the decodeToken method value from angular2-jwt.
    const jwtHelper = new JwtHelper();
    return jwtHelper.decodeToken(token);

  }


  }

