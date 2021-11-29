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

  @Output()
  nextPage: EventEmitter<void>;

  private readonly thresholdPercent: number;

  constructor() {
    this.addToCart = new EventEmitter<string>();
    this.nextPage = new EventEmitter<void>();
    this.thresholdPercent = 0.8;
  }

  addProductToCart(productName: string): void {
    this.addToCart.emit(productName);
  }

  focusFirstOption() {
    if (this.productSuggestions.length > 0) {
      (document.getElementsByClassName('autocomplete-item')[0] as any).focus();
    }
  }

  onScroll(element: Element) {
    const scrollThreshold =
      (this.thresholdPercent * 100 * element.scrollHeight) / 100;
    const currentScrollPosition = element.scrollTop + element.clientHeight;
    if (currentScrollPosition > scrollThreshold) {
      this.nextPage.emit();
    }
  }

  onKeyDown(e: KeyboardEvent, index: number): void {
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
