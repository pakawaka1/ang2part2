import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private app = 'mean.';
  constructor() { }
  set(key, data) {
    return localStorage.setItem(`${this.app}${key}`, JSON.stringify(data));
  }
  get(key) {
    return JSON.parse(localStorage.getItem(`${this.app}${key}`));
  }
  removeItem(key) {
    return localStorage.removeItem(`${this.app}${key}`);
  }
}
