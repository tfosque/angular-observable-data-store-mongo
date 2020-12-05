import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productCount = 0;
  // Make products$ private so it's not accessible from the outside, 
  // expose it as puppies$ observable (read-only) instead.
  // Write to products$ only through specified store methods below.
  private readonly products = new BehaviorSubject<Product[]>([]);
  private readonly selectedProducts = new BehaviorSubject<Product[]>([]);
  private readonly pageSize = new BehaviorSubject<number>(25);


  // Exposed observable (read-only).
  readonly products$ = this.products.asObservable();
  readonly selectedProducts$ = this.selectedProducts.asObservable();
  readonly pageSize$ = this.pageSize.asObservable();
  public selectedProductsValue = this.selectedProducts.value;

  constructor(
    private readonly http: HttpClient
  ) { }

  // Get last value without subscribing to the productItems$ observable (synchronously).
  getProductItems(): void {
    this.http.get('http://localhost:3000/api/productsDBs')
      .subscribe((products: Product[]) => {
        if (this.products.value.length > 0) {
          this.removeProductItem(null, this.products.value);
        } else {
          // console.log('products:service:', { products });
          this.removeProductItem(null, products);
        }
        // this.products.next(products);
      });
    // return this.products$.getValue();
  }

  private setProduct(items: Product[]): void {
    this.products.next(items);
    this.selectedProductsValue = items;
    this.productCount = items.length;
  }
  addProductItem(item: Product): void {
    const results = [...this.selectedProductsValue, item];
    console.log('products:addProductItem:', [...this.selectedProductsValue, item]);

    this.setProduct(results);
  }
  removeProductItem(item: Product, store): void {
    // console.log({ store });
    if (item === null) {
      this.setProduct(store);
      return;
    }
    const results = store.filter(i => i.id !== item.id);
    this.setProduct(results);
    // console.log('product:service:', { item });
    // console.log('product:service:length:', results.length);
  }

  setPageSize(size: number) {
    // console.log('size:', size * 25);
    this.pageSize.next(size * 25);
  }

  addToSelectedProducts(item: any) {
    this.removeProductItem(item, this.products.value);

    const currSelections = this.selectedProducts.value;
    const updatedSelections = [...currSelections, item];
    // console.log('product:service', { updatedSelections });
    // console.log({ currSelections });
    // console.log({ updatedSelections });

    this.selectedProducts.next(updatedSelections);
    this.selectedProductsValue = updatedSelections;
  }
  clearSelections() {
    this.selectedProducts.next([]);
    this.selectedProductsValue = [];
  }

}
