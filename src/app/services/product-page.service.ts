import { ProductDisplay } from 'src/app/models/product-display';
import { HttpClient } from '@angular/common/http';
import { ProductStoreService } from './product-store.service';
import { CartService } from 'src/app/services/cart.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from '../models/cart-item';
import { find, isEmpty } from 'lodash';

const defaultProduct = {
  name: ''
};

@Injectable({
  providedIn: 'root'
})
export class ProductPageService {
  productPage: BehaviorSubject<ProductDisplay> = new BehaviorSubject<ProductDisplay>(defaultProduct);

  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductStoreService,
    private readonly http: HttpClient
  ) { }

  /* Check if product is in cartDB */
  getCart() {
    return this.cartService.cart$.subscribe(cart => {
      console.log({ cart });
      return cart;
    });
  }

  setProductPage(product: ProductDisplay) {
    this.productPage.next(product);
  }
  setProductPagePid(productId: string) {
    const results = this.findProductId(productId);
    console.log({ results });
    // this.productPage.next(product);
  }
  findProductId(productId: string): any {
    const res = this.cartService.cart$.subscribe(cart => {
      // console.log({ cart });
      const results = find(cart, ['productId', productId]);
      // console.log({ results });
      return results;
    });
  }

  /* If yes then */
  /* If no then */
  /* check if product is in ProductsDB */
  /* Return a product */
  checkProducts(empty: boolean, productId: string) {
    console.log('second empty', { empty });

    /* XHR request */
    this.http.get('http://localhost:3000/api/productsDBs').subscribe(productData => {
      const productP = find(productData, ['productId', productId]);
      console.log({ productP }, 'fetchProducts.....');
      this.productPage.next(productP);
    });
  }

  checkCart(productId: string): Observable<any> {
    let empty = null;

    /* XHR request */
    const tim = this.http.get('http://localhost:3000/api/carts').subscribe(data => {
      const productC = find(data, ['productId', productId]);
      empty = isEmpty(productC);
      console.log('first empty', empty);
      console.log({ data }, 'fetchCart...', { productC }),
        this.productPage.next(productC);
    },
      error => console.warn(error),
      () => {
        if (empty) {
          this.checkProducts(isEmpty(empty), productId);
          return;
        }
        tim.unsubscribe();
      }
    );

    return;
  }
}
