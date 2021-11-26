import { Product, CartProduct } from './../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ProductsService {
  private readonly baseURL: string = '/product';

  constructor(private http: HttpClient) {}

  getProductsByFilter(searchStr: string) {
    return this.http.get<Product[]>(this.baseURL + `?filter=${searchStr}`).pipe(
      catchError(err => {
        console.error('response error from products request: ', err);
        return of(null);
      })
    );
  }
}
