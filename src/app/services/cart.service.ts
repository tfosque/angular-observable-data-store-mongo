import { ProductStoreService } from './product-store.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Product } from '../models/cart-item';
import { find, isEmpty } from 'lodash';
import { NotificationService } from './notification.service';

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
  //  cartValue = this.cart.value;
  readonly cartCount$ = this.cartCount.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly productStore: ProductStoreService,
    private readonly route: Router,
    private readonly notificatonService: NotificationService
  ) { }

  // Get last value without subscribing to the cart$ observable (synchronously).
  fetchCartItems() {
    this.http.get('http://localhost:3000/api/carts')
      .subscribe((nextCart: Product[]) => {
        this.setCart(nextCart);
        // this.cart.next(nextCart)
      });
    // return this.cart.getValue();
    return;
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

  cartItemExist(item: Product) {
    console.log('cartItemExists:item', item);

    this.http.get(`http://localhost:3000/api/carts/${item.id}/exists`)
      .subscribe(exist => {
        console.log({ exist });
      });
    this.getCartItems().subscribe(x => console.log({ x }));
  }

  updateCart(item: Product) {
    const payload = { 'quantity': item.quantity };
    console.log({ payload });

    this.cartItemExist(item);
    this.http.patch(`http://localhost:3000/api/carts/${item.id}`, payload).subscribe(res => {
      this.getCartItems()
      console.log(this.cart.value);
    });
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
        cartId: item.id,
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

    // const formatPayload = JSON.stringify(payload);
    /* Send Payload to Api */
    this.http.post('http://localhost:3000/api/carts', payload)
      .subscribe((response: any) => {
        this.clearSelectedProducts();
        this.setCart(newCart);
        this.setCartCount(this.cart.value);
        console.log('posting a product.....');
        this.notificatonService.sendNotification({ message: 'Item was added to cart', show: true });
        this.route.navigateByUrl('');
      });
    return;
  }
  clearSelectedProducts() {
    this.productStore.clearSelections();
  }

  clearCart(): void {
    // TODO Clear Mongo Collection???
    // DELETE /modelName?filter=[filterType1]=val1&filter[filterType2]=val2...
    this.http.delete('http://localhost:3000/api/carts?filter[where][id]=xyz')
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

  isItemInCart(item: Product) {
    const isInCart = !isEmpty(find(this.cart.value, ['productId', item.productId]));
    console.log({ isInCart });
    return isInCart;
  }
}
