import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthReq } from '../../../shared/models/auth/auth-req';
import { Observable } from 'rxjs';
import { AuthRes } from '../../../shared/models/auth/auth-res';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1';

  constructor(private http: HttpClient) { }

  register(url: String, body: AuthReq): Observable<AuthRes> {
    return this.http.post<AuthRes>(`${this.baseUrl}/${url}`, body)
  }

  storeUserInfo(result: { message: string, token: string, user: { name: string, email: string, role: string } }) {
    localStorage.setItem('token', result.token);
    localStorage.setItem('user', JSON.stringify(result.user))
  }

  isLoggedIn(){
    return localStorage.getItem('token') ? true : false
  }

  forgetPassword(email:string){
    return this.http.post(`${this.baseUrl}/auth/forgotPasswords`, {'email':email})
  }

  resetCode(body:any){
    return this.http.post(`${this.baseUrl}/auth/verifyResetCode`, body)
  }

  resetEmail(body:any){
    return this.http.put(`${this.baseUrl}/auth/resetPassword`, body)
  }
}
