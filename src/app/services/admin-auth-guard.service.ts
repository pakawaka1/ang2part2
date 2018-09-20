import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()

export class AdminAuthGuardService implements CanActivate  {

  constructor(private authService: AuthService, private router: Router ) { }

  // In the admin auth we need to verify that it is both logged in and logged in as an admin…

  canActivate() {
    if (this.authService.currentUser && this.authService.currentUser.admin) {
      return true;
    } else {
    this.router.navigate(['/not-found']);
    return false;
  }
}
}
