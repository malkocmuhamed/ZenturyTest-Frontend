import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { UserLogin } from "../_models/userLogin.model";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserLoginService {

    private userLoginsUrl =  environment.baseUrl + '/api/UserLogins'; 

    constructor(private http: HttpClient) { }
  
    getUserLogins(): Observable<UserLogin[]> {
      return this.http.get<UserLogin[]>(`${this.userLoginsUrl}`);
    }

}