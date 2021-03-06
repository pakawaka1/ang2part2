import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  githubUrl = 'https://api.github.com/users/pakawaka1/repos';

  constructor( private http: HttpClient ) { }

  getAllRepos() {
    return this.http.get(this.githubUrl);
  }

}
