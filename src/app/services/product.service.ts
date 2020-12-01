import { CartItem } from './../models/cart-item';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductItem } from '../models/cart-item';
import { uniqBy, filter } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Make products$ private so it's not accessible from the outside, 
  // expose it as puppies$ observable (read-only) instead.
  // Write to products$ only through specified store methods below.
  private readonly products = new BehaviorSubject<ProductItem[]>([]);
  private readonly selectedProducts = new BehaviorSubject<ProductItem[]>([]);
  private readonly pageSize = new BehaviorSubject<number>(25);


  // Exposed observable (read-only).
  readonly products$ = this.products.asObservable();
  readonly selectedProducts$ = this.selectedProducts.asObservable();
  readonly pageSize$ = this.pageSize.asObservable();
  public selected_Products = this.selectedProducts.value;

  constructor(
    private readonly http: HttpClient
  ) { }

  // Get last value without subscribing to the productItems$ observable (synchronously).
  getProductItems(): void {
    this.http.get('http://localhost:3000/api/productsDBs')
      .subscribe((products: ProductItem[]) => {
        if (this.products.value.length > 0) {
          this.removeProductItem(null, this.products.value);
        } else {
          console.log({ products });
          this.removeProductItem(null, products);
        }
        // this.products.next(products);
      });
    // return this.products$.getValue();
  }

  private setProduct(items: ProductItem[]): void {
    this.products.next(items);
    this.selected_Products = items;
  }
  addProductItem(item: ProductItem): void {
    const results = [...this.selected_Products, item];
    console.log('addProductItem:', [...this.selected_Products, item]);

    this.setProduct(results);
  }
  removeProductItem(item: ProductItem, store): void {
    console.log({ store });
    console.log({ item });

    // const store = this.products.value; // this.products.value;
    if (item === null) {
      this.setProduct(store);
      return;
    }
    const results = store.filter(i => i.id !== item.id);
    this.setProduct(results);

    console.log('length:', results.length);
    console.log({ results });
  }

  setPageSize(size: number) {
    // console.log('size:', size * 25);
    this.pageSize.next(size * 25);
  }

  addToSelectedProducts(item: any) {
    this.removeProductItem(item, this.products.value);

    const currSelections = this.selectedProducts.value;
    const updatedSelections = [...currSelections, item];
    console.log({ updatedSelections });
    // console.log({ currSelections });
    // console.log({ updatedSelections });

    this.selectedProducts.next(updatedSelections);
    this.selected_Products = updatedSelections;
  }
  clearSelections() {
    this.selectedProducts.next([]);
    this.selected_Products = [];
  }

}
