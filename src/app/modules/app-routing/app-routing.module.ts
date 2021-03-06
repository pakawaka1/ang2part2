import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../../components/home/home.component';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';
import { UsersComponent } from '../../components/users/users.component';
import { NotFoundComponent } from '../../components/not-found/not-found.component';
import { GithubComponent } from '../../components/github/github.component';


import { ProfileModule } from '../profile/profile.module';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UsersComponent },
  { path: 'github', component: GithubComponent },
  { path: 'user/:id', loadChildren: () => ProfileModule },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
