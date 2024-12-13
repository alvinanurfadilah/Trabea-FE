import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  getToken(): string {
    return window.localStorage['jwtToken'];
  }

  setToken(token: string): void {
    window.localStorage['jwtToken'] = token;
  }

  getRoleId(): number {
    return window.localStorage['roleId'];
  }

  setRoleId(roleId: number): void {
    window.localStorage['roleId'] = roleId;
  }

  getFullName(): string {
    return window.localStorage['fullName'];
  }

  setFullName(fullName: string): void {
    window.localStorage['fullName'] = fullName;
  }

  getEmail(): string {
    return window.localStorage['email'];
  }

  setEmail(email: string): void {
    window.localStorage['email'] = email;
  }

  destroyLocalStorage(): void {
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('roleId');
    window.localStorage.removeItem('fullName');
    window.localStorage.removeItem('email');
  }
}
