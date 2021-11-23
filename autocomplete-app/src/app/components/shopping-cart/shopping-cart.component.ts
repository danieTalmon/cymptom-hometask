import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.less']
})
export class ShoppingCartComponent implements OnInit {

  searchStringSubject: Subject<string>;

  constructor() {
    this.searchStringSubject = new Subject<string>();
   }

  ngOnInit(): void {
    
  }

  onChangeSearch(searchString)

}
