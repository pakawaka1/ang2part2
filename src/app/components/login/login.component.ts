import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

// import Router here
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

// import Auth Service here
import { AuthService } from '../../services/auth.service';



import { ErrorStateManager } from '../../classes/error-state-manager';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authUser = {
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: ''
  };
  matcher = new ErrorStateManager();
  // add property here
  invalidLogin: boolean;

  // add auth service here and router too

  constructor(private userService: UserService, private authService: AuthService, private router: Router ) { }
  login(credentials) {
    this.userService.login(this.authUser);
    console.log('thisnowork');
    this.authService.login(credentials).subscribe(result => {
      if (result) {
        this.router.navigate(['/']);
        console.log('thisnowork');
       } else {
         this.invalidLogin = true;
       }

    });
  }

  ngOnInit() {
  }

}
