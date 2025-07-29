import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetCategoriesRes } from '../../../shared/models/categories/getCategoriesRes';

@Injectable({
  providedIn: 'root'
})
export class Categories {
  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1';

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<GetCategoriesRes> {
    return this.http.get<GetCategoriesRes>(`${this.baseUrl}/categories`)
  }

  getSubCategories(id:string):Observable<GetCategoriesRes>{
    return this.http.get<GetCategoriesRes>(`${this.baseUrl}/categories/${id}/subcategories`)
  }
}
