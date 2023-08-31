import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { UserLogin } from "../_models/userLogin.model";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserLoginService {

    // categoryUrl = environment.baseUrl + '/api/category';

    // constructor(private _http: HttpClient) { }

    // getAllCategories(): Observable<UserLogin[]> {
    //     return this._http.get<UserLogin[]>(this.categoryUrl);
    // }

}