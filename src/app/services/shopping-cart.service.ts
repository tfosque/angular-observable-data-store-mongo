import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  // Make cart$ private so it's not accessible from the outside, 
  // expose it as puppies$ observable (read-only) instead.
  // Write to cart$ only through specified store methods below.
  private readonly cart$ = new BehaviorSubject<CartItem[]>([]);

  // Exposed observable (read-only).
  readonly cartItems$ = this.cart$.asObservable();

  constructor() { }

  // Get last value without subscribing to the puppies$ observable (synchronously).
  getCartItems(): CartItem[] {
    return this.cart$.getValue();
  }

  private setCart(items: CartItem[]): void {
    this.cart$.next(items);
  }

  addCartItem(item: CartItem): void {
    const results = [...this.getCartItems(), item];
    this.setCart(results);
  }

  removeCartItem(item: CartItem): void {
    const results = this.getCartItems().filter(i => i.id !== item.id);
    this.setCart(results);
  }

  /* adoptPuppy(item: CartItem): void {
    const puppies = this.getCartItems().map(i =>
      i.id === item.id ? new CartItem() : i
    );
    this.setCart(puppies);
  } */
}
