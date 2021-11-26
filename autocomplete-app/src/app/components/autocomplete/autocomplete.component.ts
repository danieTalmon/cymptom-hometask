import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.less'],
})
export class AutocompleteComponent {
  @Input()
  productSuggestions: string[];

  @Input()
  isAutocompleteHidden: boolean;

  @Output()
  addToCart: EventEmitter<string>;

  constructor() {
    this.addToCart = new EventEmitter<string>();
  }

  addProductToCart(productName: string): void {
    this.addToCart.emit(productName);
  }

  focusFirstOption() {
    if (this.productSuggestions.length > 0) {
      (document.getElementsByClassName('autocomplete-item')[0] as any).focus();
    }
  }

  onKeyDown(e: KeyboardEvent, index: number): void {
    console.log('autocomplete', e.key);

    if (e.key === 'ArrowDown' && index < this.productSuggestions.length - 1) {
      (
        document.getElementsByClassName('autocomplete-item')[index + 1] as any
      ).focus();
    }
    if (e.key === 'ArrowUp' && index > 0) {
      (
        document.getElementsByClassName('autocomplete-item')[index - 1] as any
      ).focus();
    }
  }
}
