import { ProductStoreService } from './product-store.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/cart-item';
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
  private readonly cart = new BehaviorSubject<Product[]>([]);
  private readonly cartCount = new BehaviorSubject<number>(0);

  // Exposed observable (read-only).
  readonly cart$ = this.cart.asObservable();
  readonly cartCount$ = this.cartCount.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly productStore: ProductStoreService
  ) { }

  // Get last value without subscribing to the cart$ observable (synchronously).
  fetchCartItems(): Product[] {
    this.http.get('http://localhost:3000/api/carts')
      .subscribe((nextCart: Product[]) => {
        this.setCart(nextCart);
      });
    return;
    // return this.cart.getValue();
  }

  getCartItems() {
    return this.cart$;
  }


  private setCart(items: Product[]): void {
    this.cart.next(items);
    this.setCartCount(items);
  }

  setCartCount(cart: Product[]) {
    this.cartCount.next(cart.length);
  }

  saveSelectionsToCart(selections: Product[]) {
    console.log({ selections });

    /* Save Cart Items after Checking for Dups */
    const newCart = [...this.cart.value, ...selections];

    /* Format payload */
    const payload: Product[] = [];
    /* Post */
    selections.map((item: Product) => {
      payload.push({
        name: item.name,
        desc: item.desc,
        price: item.price,
        total: item.total,
        quantity: item.quantity,
        productId: item.productId,
        images: item.images,
        sku: item.sku,
        unit: item.unit,
        manufacturer: item.manufacturer,
        video: item.video,
        colors: item.colors,
        size: item.size
      });
    });

    /* Send Payload to Api */
    this.http.post('http://localhost:3000/api/carts', payload)
      .subscribe((response: any) => {
        this.clearSelectedProducts();
        this.setCart(newCart);
        this.setCartCount(this.cart.value);
        console.log('posting a product.....');
      });
    return;
  }
  clearSelectedProducts() {
    this.productStore.clearSelections();
  }

  clearCart(): void {
    // TODO: Clear Mongo Collection???
    // DELETE /modelName?filter=[filterType1]=val1&filter[filterType2]=val2...
    this.http.delete('http://localhost:3000/api/carts?filter[where][id][neq]=xyz')
      .subscribe(response => {
        console.log('deleting cart items......');
      });
    this.cart.next([]);
  }
  removeCartItem(item: Product): void {
    const results = this.cart.value.filter(i => i.id !== item.id);
    /* Delete Item */
    this.http.delete(`http://localhost:3000/api/carts/${item.id}`).subscribe(status => {
      this.setCart(results);
    });

  }

}
