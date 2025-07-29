import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GetProducutsRes, productInfo } from '../../../shared/models/products/getProductsRes';

@Injectable({
  providedIn: 'root'
})
export class ProdcutsService {
  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1';
  wishlistLength = new BehaviorSubject(0);
  cartLength = new BehaviorSubject(0)

  constructor(private http: HttpClient) { }

  getAllProdcuts(): Observable<GetProducutsRes> {
    return this.http.get<GetProducutsRes>(`${this.baseUrl}/products`)
  }

  getProductById(id: String): Observable<productInfo> {
    return this.http.get<productInfo>(`${this.baseUrl}/products/${id}`)
  }
  
 getAllWishList(){
    return this.http.get(`${this.baseUrl}/wishlist`)
  }

  addtoWhishlist(id: String) {
    return this.http.post(`${this.baseUrl}/wishlist`, { productId: `${id}` })
  }

  deleteFromWhishlist(id: String) {
    return this.http.delete(`${this.baseUrl}/wishlist/${id}`)
  }

  addToCart(id: String) {
    return this.http.post(`${this.baseUrl}/cart`, { productId: `${id}` })
  }

  getAllCart(){
    return this.http.get(`${this.baseUrl}/cart`)
  }

  increaseDecreaseQuty(id:String,count:number){
    return this.http.put(`${this.baseUrl}/cart/${id}`,{count:count})
  }

  deleteCartProduct(id:String){
    return this.http.delete(`${this.baseUrl}/cart/${id}`)
  }

  deleteAllCart(){
    return this.http.delete(`${this.baseUrl}/cart`)
  }

  payNow(body:any){
    return this.http.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/688162f057e78d1e4bfbd2d8?url=https://routeegy.github.io/Ecommerce`,body)
  }
}
