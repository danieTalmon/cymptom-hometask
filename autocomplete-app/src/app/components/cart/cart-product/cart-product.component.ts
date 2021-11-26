import { CartProduct } from './../../../models/product.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.less']
})
export class CartProductComponent implements OnInit {

  @Input()
  cartProduct: CartProduct;

  @Output()
  deleteFromCart: EventEmitter<void>;

  constructor() {
    this.deleteFromCart = new EventEmitter<void>()
   }

  ngOnInit(): void {
  }

  deleteProductFromCart() {
    this.deleteFromCart.emit();
  }

}
