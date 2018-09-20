import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
  MatListModule, MatInputModule, MatTableModule, MatTabsModule, MatCardModule, MatCard } from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersComponent } from './components/users/users.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { GithubComponent } from './components/github/github.component';
import { SearchPipe } from './pipes/search.pipe';


// Imports for Lesson
import { AuthService } from './services/auth.service';
import { FakeBackendProvider} from './fake-backend/fake-backend';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, HttpModule } from '@angular/http';
import { AdminComponent } from './components/admin/admin.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard-service';


 @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    NotFoundComponent,
    GithubComponent,
    SearchPipe,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatTableModule,
    MatTabsModule,
    MatCardModule,
    // Add these routes when creating the auth guard
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService] },
      { path: 'login', component: LoginComponent },
      { path: 'not-found', component: NotFoundComponent}
    ])
  ],
  providers: [

      AuthService,
      // Add this provider for the auth guard
      AuthGuardService,
      // This is for the Lesson
      // For creating a mock back-end. You don't need these in a real app.
      FakeBackendProvider,
      MockBackend,
      BaseRequestOptions



  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
