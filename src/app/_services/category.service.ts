import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { Category } from "../_models/category.model";
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    categoryUrl = environment.baseUrl + '/api/category';

    constructor(private _http: HttpClient) { }

    getAllCategories(): Observable<Category[]> {
        return this._http.get<Category[]>(this.categoryUrl);
    }

}