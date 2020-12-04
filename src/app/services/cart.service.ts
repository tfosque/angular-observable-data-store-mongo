import { ProductStoreService } from './product-store.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item';
// import { fromFetch } from 'rxjs/fetch';
// mport { switchMap, catchError } from 'rxjs/operators';
import { uniqBy } from 'lodash';

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
  fetchCartItems(): CartItem[] {
    this.http.get('http://localhost:3000/api/carts')
      .subscribe((nextCart: CartItem[]) => {
        this.setCart(nextCart);
      });
    return;
    // return this.cart.getValue();
  }

  getCartItems() {
    return this.cart$
  }


  private setCart(items: CartItem[]): void {
    this.cart.next(items);
    this.setCartCount(items);
  }

  setCartCount(cart: CartItem[]) {
    this.cartCount.next(cart.length);
  }

  saveSelectionsToCart(selections: CartItem[]) {
    /* Save Cart Items after Checking for Dups */
    const newCart = [...this.cart.value, ...selections];

    /* Format payload */
    const payload: CartItem[] = [];
    /* Post */
    selections.map((item: CartItem) => {
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
        this.clearSelectedProducts();
        this.setCart(newCart);
        this.setCartCount(this.cart.value);
      });
    return;
  }

  checkIfCartItemExists(name: string) {
    this.cart.value.filter(cartItem => {
      if (cartItem.name === name) {
        console.log({ name })
      }
    });
    // Mockingbird, galapagos
  }

  findUniq(items: CartItem[]) {
    // const data = this.cart.value.concat(items);
    // console.log({ cartItems }, { items });
    // console.log('uniqBy', uniqBy(data, 'name'));
    // return uniqBy(data, 'name');

    return items.filter(i => {
      return this.cart.value.map(ci => {
        /* save to db if names don't match */
        if (i.name === ci.name) {
          // dont return item
          // console.log('found:', i.name, '-match-', ci.name);
          // return m;
        } else {
          // return item
          console.log([...this.cart.value, ci]);
          return [...this.cart.value, ci];
        }
      });
    });
  }

  clearSelectedProducts() {
    this.productStore.clearSelections();
  }

  clearCart(): void {
    // TODO: Clear Mongo Collection???
    this.http.post('http://localhost:3000/api/carts/', [])
      .subscribe(response => {
        console.log('post cart items......');
        // console.log('cart:service:', { response });
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
