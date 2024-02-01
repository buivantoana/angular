import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private api =
    'https://courageous-taiyaki-0f7607.netlify.app/.netlify/functions/api/category';

  headers: any;
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.headers = new HttpHeaders({
        Authorization: `Bearer ${JSON.parse(token).token}`,
      });
    }
  }

  getCategory(): Observable<any> {
    return this.http.get<any>(this.api, { headers: this.headers });
  }
  getPagiCategory(page: any): Observable<any> {
    return this.http.get<any>(
      `${this.api}/pagi?page=${page.page}&size=${page.size}`,
      { headers: this.headers }
    );
  }
  getSearchCategory(id: any): Observable<any> {
    return this.http.get<any>(
      `${this.api}/search/${id.search}?page=${id.page}&size=${id.size}`,
      { headers: this.headers }
    );
  }
  getOneCategory(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/detail/${id}`, {
      headers: this.headers,
    });
  }
  deleteCategory(id: string) {
    return this.http.delete(`${this.api}/${id}`, { headers: this.headers });
  }
  addCategory(Category: any) {
    return this.http.post(`${this.api}`, Category, { headers: this.headers });
  }
  updateCategory(Category: any) {
    return this.http.put(`${this.api}/${Category.id}`, Category, {
      headers: this.headers,
    });
  }
}
