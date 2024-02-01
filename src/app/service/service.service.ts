import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { join } from 'node:path';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private api =
    'https://courageous-taiyaki-0f7607.netlify.app/.netlify/functions/api/product';

  headers: any;
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.headers = new HttpHeaders({
        Authorization: `Bearer ${JSON.parse(token).token}`,
      });
    }
  }

  getProduct(page: any): Observable<any> {
    return this.http.get<any>(
      `${this.api}?page=${page.page}&size=${page.size}`,
      { headers: this.headers }
    );
  }
  getOneProduct(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/detail/${id}`);
  }
  getCategoryProduct(id: any): Observable<any> {
    return this.http.get<any>(
      `${this.api}/category/${id.id}?page=${id.page}&size=${id.size}`,
      { headers: this.headers }
    );
  }
  getSearchProduct(id: any): Observable<any> {
    return this.http.get<any>(
      `${this.api}/search/${id.search}?page=${id.page}&size=${id.size}`,
      { headers: this.headers }
    );
  }
  getSearchDebouceProduct(id: any): Observable<any> {
    return this.http.get<any>(`${this.api}/searchdebouce?search=${id.search}`, {
      headers: this.headers,
    });
  }
  getFilterProduct(id: any): Observable<any> {
    return this.http.post<any>(
      `${this.api}/filter?page=${id.page}&size=${id.size}`,
      { id: id.id },
      { headers: this.headers }
    );
  }
  deleteProduct(id: string) {
    return this.http.delete(`${this.api}/${id}`, { headers: this.headers });
  }
  addProduct(product: any) {
    return this.http.post(`${this.api}`, product, { headers: this.headers });
  }
  updateProduct(product: any) {
    return this.http.put(`${this.api}/${product.id}`, product, {
      headers: this.headers,
    });
  }
}
