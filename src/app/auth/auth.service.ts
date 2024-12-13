import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { AuthRequest, AuthResponse, RoleDropdown } from './auth.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../app.config';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _loggedInUserSubject = new BehaviorSubject<AuthResponse | null>(null);
  private _jwtService = inject(JwtService);
  private _http = inject(HttpClient);
  private _apiUrl = environment.apiUrl;
  private _router = inject(Router);

  currentUser$ = this._loggedInUserSubject.asObservable();
  isAuthenticated$ = this.currentUser$.pipe(map((u) => u !== null));

  private setAuth(authResponse: AuthResponse) {
    this._loggedInUserSubject.next(authResponse);
    this._jwtService.setToken(authResponse.token);
    this._jwtService.setFullName(authResponse.fullName);
    this._jwtService.setEmail(authResponse.email);
  }

  private purgeAuth() {
    this._loggedInUserSubject.next(null);
    this._jwtService.destroyLocalStorage();
  }

  login(request: AuthRequest): Observable<AuthResponse> {
    return this._http.post<AuthResponse>(`${this._apiUrl}/auth`, request).pipe(
      tap((response) => {
        this.setAuth(response);
      })
    );
  }

  logout() {
    this.purgeAuth();
    this._router.navigate(['login']);
  }

  getCurrentUser() {
    return this._http.get<AuthResponse>(`${this._apiUrl}/auth`).pipe(
      tap((u) => this.setAuth(u)),
      catchError(() => of(this.logout()))
    );
  }

  getRoleDropdown() {
    return this._http.get<RoleDropdown[]>(`${this._apiUrl}/role/role-dropdown`);
  }
}
