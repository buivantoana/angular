import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api =
    'https://courageous-taiyaki-0f7607.netlify.app/.netlify/functions/api/auth';

  headers: any;
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.headers = new HttpHeaders({
        Authorization: `Bearer ${JSON.parse(token).token}`,
      });
    }
  }

  SignUp(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/signup`, data);
  }
  SignIn(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/signin`, data);
  }
  getPagiUser(page: any): Observable<any> {
    return this.http.get<any>(
      `${this.api}/pagi?page=${page.page}&size=${page.size}`,
      { headers: this.headers }
    );
  }
  getSearchUser(id: any): Observable<any> {
    return this.http.get<any>(
      `${this.api}/search/${id.search}?page=${id.page}&size=${id.size}`,
      { headers: this.headers }
    );
  }
  deleteUser(id: string) {
    return this.http.delete(`${this.api}/delete/${id}`, {
      headers: this.headers,
    });
  }
}
