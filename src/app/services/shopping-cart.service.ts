import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  // Make cartItems private so it's not accessible from the outside, 
  // expose it as puppies$ observable (read-only) instead.
  // Write to cartItems only through specified store methods below.
  private readonly cartItems = new BehaviorSubject<CartItem[]>([]);
  private readonly cartCount = new BehaviorSubject<number>(0);

  // Exposed observable (read-only).
  readonly cartItems$ = this.cartItems.asObservable();
  readonly cartCount$ = this.cartCount.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly productService: ProductService
  ) { }

  // Get last value without subscribing to the cartItems$ observable (synchronously).
  getCartItems(): CartItem[] {
    this.http.get('http://localhost:3000/api/carts')
      .subscribe((res: CartItem[]) => {
        // console.log({ res });
        this.cartItems.next(res);
        this.cartCount.next(res.length);
      });
    return;
    // return this.cartItems.getValue();
  }

  private setCart(items: CartItem[]): void {
    this.cartItems.next(items);
    this.cartCount.next(items.length);
    // console.log('setCart:cartItems', this.cartItems.value);
  }
  addCartItems(items: CartItem[]): void {
    console.log({ items });

    this.getCartItems();
    /* Check For Dups */
    let newItems: CartItem[] = [];

    /* Format payload */
    const payload: CartItem[] = [];
    items.map((i: CartItem) => {
      payload.push({
        name: i.name,
        price: i.price,
        qty: i.qty,
        total: i.total
      });
    });

    /* Post payload to Api */
    this.http.post('http://localhost:3000/api/carts', payload)
      .subscribe((postResponse: any) => {
        this.getCartItems();
        newItems = [];
      });
    return;
  }
  clearSelectedProducts() {
    /* try catch */
    this.productService.clearSelections();
  }

  clearCart(): void {
    this.http.post('http://localhost:3000/api/carts/', [])
      .subscribe(response => {
        console.log('cart:service:', { response });
      });
    this.cartItems.next([]);
    /* TODO: Clear MongodDB */
  }

  removeCartItem(item: CartItem): void {
    const results = this.cartItems.value.filter(i => i.id !== item.id);
    this.http.delete(`http://localhost:3000/api/carts/${item.id}`).subscribe(status => {
      // console.log({ status }, { item });
      this.setCart(results);
    });

  }

}
