import { ProductStoreService } from './product-store.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item';
// import { fromFetch } from 'rxjs/fetch';
// mport { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Make cart private so it's not accessible from the outside, 
  // expose it as puppies$ observable (read-only) instead.
  // Write to cart only through specified store methods below.
  private readonly cart = new BehaviorSubject<CartItem[]>([]);
  private readonly cartCount = new BehaviorSubject<number>(0);

  // Exposed observable (read-only).
  readonly cart$ = this.cart.asObservable();
  readonly cartCount$ = this.cartCount.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly productStore: ProductStoreService
  ) { }

  // Get last value without subscribing to the cart$ observable (synchronously).
  getCartItems(): CartItem[] {
    this.http.get('http://localhost:3000/api/carts')
      .subscribe((nextCart: CartItem[]) => {
        this.setCart(nextCart);
      });
    return;
    // return this.cart.getValue();
  }

  private setCart(items: CartItem[]): void {
    console.log('setCart:', { items });

    this.cart.next(items);
    this.setCartCount(items);
  }

  setCartCount(cart: CartItem[]) {
    console.log('setCartCount::::', { cart });

    this.cartCount.next(cart.length);
  }
  /* Save Cart Items after Checking for Dups */
  saveSelectionsToCart(cartItems: CartItem[]) {
    console.log({ cartItems });

    /* Fetch Cart to later setCartCount */
    this.getCartItems();
    /* TODO: Check For Dups */
    // let newItems: CartItem[] = [];

    /* Format payload */
    const payload: CartItem[] = [];
    /* Post */
    cartItems.map((item: CartItem) => {
      payload.push({
        name: item.name,
        price: item.price,
        qty: item.qty,
        total: item.total
      });
    });

    /* Send Payload to Api */
    this.http.post('http://localhost:3000/api/carts', payload)
      .subscribe((response: any) => {
        console.log({ response }, { payload });
        this.clearSelectedProducts();
        // this.setCart(nextCart);
        this.setCartCount(this.cart.value);
      });

    return;
  }
  clearSelectedProducts() {
    this.productStore.clearSelections();
  }

  clearCart(): void {
    // TODO: Clear Mongo Collection???
    this.http.post('http://localhost:3000/api/carts/', [])
      .subscribe(response => {
        console.log('cart:service:', { response });
      });
    this.cart.next([]);
  }

  /* removeCartItem(item: CartItem): void {
    console.log('remove', { item });
    console.log('cart.value:', this.cart.value);

    this.cart.subscribe(x => {
      console.log({ x });
    });

    const results = this.cart.value.filter(i => i.id !== item.id);
    console.log({ results });

    this.http.delete(`http://localhost:3000/api/carts/${item.id}`).subscribe(status => {
      this.setCart(results);
    });
  } */
  removeCartItem(item: CartItem): void {
    const results = this.cart.value.filter(i => i.id !== item.id);
    /* Delete Item */
    this.http.delete(`http://localhost:3000/api/carts/${item.id}`).subscribe(status => {
      this.setCart(results);
    });

  }

}
