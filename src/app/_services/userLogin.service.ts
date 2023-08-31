import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { UserLogin } from "../_models/userLogin.model";
import { environment } from '../../environments/environment';
import { PaginatedResponse } from "../_models/paginated-response.mode";

@Injectable({
    providedIn: 'root'
})
export class UserLoginService {

    private userLoginsUrl =  environment.baseUrl + '/api/UserLogins'; 

    constructor(private http: HttpClient) { }
  
    getAllUserLogins(): Observable<UserLogin[]> {
      return this.http.get<UserLogin[]>(`${this.userLoginsUrl}`);
    }

    getUserLogins(page: number, pageSize: number): Observable<PaginatedResponse<UserLogin>> {
      const url = `${this.userLoginsUrl}/paging?page=${page}&pageSize=${pageSize}`;
      const params = new HttpParams()
        .set('page', page.toString())
        .set('pageSize', pageSize.toString());
  
      return this.http.get<PaginatedResponse<UserLogin>>(url);
    }

}