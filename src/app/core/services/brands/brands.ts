import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetCategoriesRes } from '../../../shared/models/categories/getCategoriesRes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1';

  constructor(private http: HttpClient) { }

  getAllBrands(): Observable<GetCategoriesRes> {
    return this.http.get<GetCategoriesRes>(`${this.baseUrl}/brands`)
  }

}
