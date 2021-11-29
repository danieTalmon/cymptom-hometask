import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from './../models/product.model';

@Injectable()
export class ProductsService {
  private readonly baseURL: string = '/product';

  constructor(private http: HttpClient) {}

  getProductsByFilter(searchStr: string, page: number) {
    return this.http.get<Product[]>(this.baseURL + `?filter=${searchStr}&page=${page}`).pipe(
      catchError(err => {
        console.error('response error from products request: ', err);
        return of(null);
      })
    );
  }
}
