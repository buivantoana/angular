import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  private api = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getProduct(): Observable<any> {
    return this.http.get<any>(this.api);
  }
  deleteProduct(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
  addProduct(product: any) {
    return this.http.post(`${this.api}`, product);
  }
  updateProduct(product: any) {
    return this.http.put(`${this.api}/${product.id}`, product);
  }
}
