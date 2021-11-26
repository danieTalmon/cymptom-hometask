import { CartProductComponent } from './components/cart/cart-product/cart-product.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsService } from './services/products.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    AutocompleteComponent,
    ShoppingCartComponent,
    CartComponent,
    CartProductComponent,
  ],
  imports: [BrowserModule, HttpClientModule, CommonModule],
  providers: [ProductsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
