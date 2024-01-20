import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api =
    'https://courageous-taiyaki-0f7607.netlify.app/.netlify/functions/api/auth';

  constructor(private http: HttpClient) {}

  SignUp(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/signup`, data);
  }
  SignIn(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/signin`, data);
  }
}