import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LocalStorageService } from '../../services/local-storage.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  get user(): any {
    return this.localStorage.get('currentUser');
  }
  logout() {
    this.userService.logout();
  }
  constructor(private breakpointObserver: BreakpointObserver, private localStorage:
    LocalStorageService, private userService: UserService, public authService: AuthService) {}

  }
