import { CartProduct } from '../../models/product.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {

  @Input()
  cartProducts: CartProduct[];

  @Output()
  deleteFromCart: EventEmitter<number>;

  constructor() {
    this.deleteFromCart = new EventEmitter<number>();
  }

  ngOnInit(): void {
  }

  deleteProductFromCart(index) {
    this.deleteFromCart.emit(index);
  }

}
