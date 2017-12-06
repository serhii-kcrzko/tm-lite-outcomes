import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BackendService {
  static BASE_URL = 'http://localhost:9000';

  constructor(private http: Http) { }

  query(URL: string, params?: Array<string>): Observable<any[]> {
    let queryUrl = `${BackendService.BASE_URL}${URL}`;
    if (params) {
      queryUrl = `${queryUrl}?${params.join('&')}`;
    }

    return this.http.request(queryUrl).map((res: any) => res.json());
  }

  getSales(): Observable<any[]> {
    return this.query('/outcomings');
  }

  getProducts(): Observable<any[]> {
    return this.query('/products');
  }

  getSale(id: string) {
    return this.query(`/outcomings/${id}`);
  }

  deleteItem(id: string) {
    return this.http.delete(`${BackendService.BASE_URL}/outcomings/${id}`)
      .map((res: any) => res.json());
  }
}

export const BACKEND_PROVIDERS: Array<any> = [
  { provide: BackendService, useClass: BackendService }
];

