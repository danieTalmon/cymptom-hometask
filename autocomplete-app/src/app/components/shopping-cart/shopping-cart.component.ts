import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Observable, of, Subject } from 'rxjs';
import {
  exhaustMap,
  map,
  scan,
  shareReplay,
  startWith,
  switchMap,
  take,
  takeUntil,
  takeWhile,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import { ProductsService } from '../../services/products.service';
import { CartProduct, Product } from './../../models/product.model';
import { AutocompleteComponent } from './../autocomplete/autocomplete.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.less'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  private searchStringSubject: Subject<string>;
  private currentPage: number;
  private destroy$: Subject<void>;
  products$: Observable<Product[]>;
  productsSuggestions$: Observable<string[]>;
  cartProducts: CartProduct[];
  currentProductActiveIndex: number;
  isAutocompleteHidden: boolean;
  @ViewChild(AutocompleteComponent)
  autocompleteComponent: AutocompleteComponent;
  nextPage$: Subject<void>;

  constructor(private productService: ProductsService) {
    this.searchStringSubject = new Subject<string>();
    this.destroy$ = new Subject<void>();
    this.isAutocompleteHidden = true;
    this.cartProducts = [];
    this.nextPage$ = new Subject<void>();
    this.currentPage = 0;
  }

  ngOnInit(): void {
    this.products$ = this.searchStringSubject.asObservable().pipe(
      switchMap((searchStr) => {
        this.currentPage = 1;
        return this.getProductsFromServerHandler(searchStr);
      }),
      shareReplay(1)
    );

    this.productsSuggestions$ = this.products$.pipe(
      map((products) => products.map((product) => product?.name))
    );

  }

  onScroll(): void {
    this.nextPage$.next();
  }

  onChangeSearch(searchString: string): void {
    this.isAutocompleteHidden = false;
    this.searchStringSubject.next(searchString);
  }

  onKeyUp(e: KeyboardEvent): void {
    if (e.key === 'ArrowDown') {
      this.autocompleteComponent.focusFirstOption();
    }
  }

  addToCart(productName: string) {
    this.products$.pipe(take(1)).subscribe((products: Product[]) => {
      const cartProduct: Product = products.find(
        (product) => product.name === productName
      );

      this.cartProducts.push({
        name: cartProduct.name,
        price: cartProduct.price,
        image: cartProduct.image,
      });

      this.hideAutocomplete();
    });
  }

  deleteFromCart(index: number): void {
    this.cartProducts.splice(index, 1);
  }

  hideAutocomplete(): void {
    this.isAutocompleteHidden = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  private getProductsFromServerHandler(searchStr: string): Observable<Product[]> {
    return searchStr === ''
          ? of([])
          : this.nextPage$.pipe(
              startWith(1),
              exhaustMap((_) =>
                this.getProductsByPage(searchStr, this.currentPage)
              ),
              tap(() => this.currentPage++),
              takeWhile((newProducts) => newProducts.length > 0, true),
              scan((currentProducts: Product[], newProducts: Product[]) =>
                currentProducts.concat(newProducts)
              )
            );
  }

  private getProductsByPage(searchStr: string, page: number) {
    return this.productService.getProductsByFilter(searchStr, page);
  }
}
