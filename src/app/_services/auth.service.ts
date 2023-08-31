import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Subject } from 'rxjs';
import { SessionService } from './session.service';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface LoginDTO {
  token: string;
}

export interface UserData {
  roles: string[];
  userId: string;
}

@Injectable()
export class AuthService {
  basePath = 'account';
  baseUrl = environment.baseUrl + '/api';
  // override apiPath = 'api';
  // override version = '';

  loggedIn$ = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.loggedIn$.next(this.isLoggedIn);
  }

  get isLoggedIn(): boolean {
    return !!SessionService.token;
  }

  get hasTokenExpired(): boolean {
    return !this.sessionToken;

  }

  get sessionToken() {
    return SessionService.token;
  }

  deleteSessionToken() {
    SessionService.deleteSession();
  }

  login(userName: string, password: string): Observable<any> {
    const loginData = { userName, password };
    return this.http.post(`${this.baseUrl}/Auth/login`, loginData);
  }

  setToken(token: string) {
    this.tokenSideAffects(token);
  }

  verifyToken(): Observable<any> {
    return this.http.get('verify-token');
  }

  getUserPermissions(): any {
    const token = {
      _doc: { permissions: ['expenses', 'accounting', 'management'] }
    };
    if (token === null) {
      return false;
    } else {
      return token._doc.permissions;
    }
  }

  logout() {
    SessionService.deleteSession();

    this.loggedIn$.next(false);
  }

  private tokenSideAffects(token: string) {
    SessionService.token = token;
    this.loggedIn$.next(true);
  }
}
