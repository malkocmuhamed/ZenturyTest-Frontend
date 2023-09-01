import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Subject } from 'rxjs';
import { SessionService } from './session.service';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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
  baseUrl = environment.baseUrl;
  loginUrl = environment.baseUrl + '/api/Auth/login';
  private errorMessage = '';
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  deleteSessionToken() {
    SessionService.deleteSession();
  }

  login(userName: string, password: string): Observable<any> {
    const loginData = { userName, password };
    this.loggedInSubject.next(true);
    return this.http.post(`${this.loginUrl}`, loginData).pipe(
      catchError(error => {
        this.errorMessage = 'Invalid username or password';
        return throwError(error);
      })
    );
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }

  logout(): void {
    this.loggedInSubject.next(false);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token; 
  }
}
