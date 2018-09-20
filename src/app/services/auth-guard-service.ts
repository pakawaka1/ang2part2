import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()

export class AuthGuardService implements CanActivate  {

    // We need to check to see if our user is logged on, so we need to inject the AuthService into the constructor of this class.
    //  In the Can Activate method, we will can see if the this user is logged on, and  set the routes to navigate the user.  We also need to inject the routers to do this.
  constructor(private authService: AuthService, private router: Router ) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
    this.router.navigate(['/login']);
    return false;
  }
}
// we also need to update the app.module to with the canActvivate properties applied to the admin routes, and we will include one or more route guards in our array.

}
