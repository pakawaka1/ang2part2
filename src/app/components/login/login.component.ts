import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, NgForm } from '@angular/forms';

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
  public f = NgForm;

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
  // here credentials is the value behind our form

  login(credentials) {
    // this.userService.login(this.authUser);  Jordon's code not mine!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    this.authService.login(credentials).subscribe(result => {
      console.log('yolo2');
      if (result) {
        this.router.navigate(['/']); // navigates to the home component
        console.log('thisworks');
       } else {
         this.invalidLogin = true;
       }

    });
  }

  ngOnInit() {
  }

}
