import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';

import { ProductsService } from '../../services/products.service';
import { CartProduct, Product } from './../../models/product.model';
import { AutocompleteComponent } from './../autocomplete/autocomplete.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.less'],
})

export class ShoppingCartComponent implements OnInit {
  private searchStringSubject: Subject<string>;
  products$: Observable<Product[]>;
  productsSuggestions$: Observable<string[]>;
  cartProducts: CartProduct[];
  currentProductActiveIndex: number;
  isAutocompleteHidden: boolean;
  @ViewChild(AutocompleteComponent) autocompleteComponent: AutocompleteComponent;

  constructor(private productService: ProductsService) {
    this.searchStringSubject = new Subject<string>();
    this.isAutocompleteHidden = true;
    this.cartProducts = [];
  }

  ngOnInit(): void {
    this.products$ = this.searchStringSubject.asObservable().pipe(
      switchMap((searchStr) =>
        searchStr === ''
          ? of([])
          : this.productService.getProductsByFilter(searchStr)
      ),
      shareReplay(1)
    );
    this.productsSuggestions$ = this.products$.pipe(
      map((products) => products.map((product) => product.name))
    );
  }

  onChangeSearch(searchString: string): void {
    this.isAutocompleteHidden = false;
    this.searchStringSubject.next(searchString);
  }

  onKeyUp(e: KeyboardEvent): void {
    console.log(e.key);
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

    deleteFromCart(index: number) {
        this.cartProducts.splice(index, 1);
    }

    hideAutocomplete() {
      this.isAutocompleteHidden = true;
    }
}
