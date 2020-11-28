import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ProductItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Make product$ private so it's not accessible from the outside, 
  // expose it as puppies$ observable (read-only) instead.
  // Write to product$ only through specified store methods below.
  private readonly product$ = new BehaviorSubject<ProductItem[]>([]);
  private readonly pageSize = new BehaviorSubject<number>(25);
  private readonly selectedProducts = new BehaviorSubject<ProductItem[]>([]);

  // Exposed observable (read-only).
  readonly productItems$ = this.product$.asObservable();

  readonly pageSize$ = this.pageSize.asObservable();
  readonly selectedProducts$ = this.selectedProducts.asObservable();

  constructor(
    private readonly http: HttpClient
  ) { }

  // Get last value without subscribing to the productItems$ observable (synchronously).
  getProductItems(): ProductItem[] {
    this.http.get('http://localhost:3000/api/productsDBs')
      .subscribe((prods: ProductItem[]) => {
        // console.log({ prods });
        this.product$.next(prods);
      });
    return;
    // return this.product$.getValue();
  }

  private setProduct(items: ProductItem[]): void {
    this.product$.next(items);
  }

  addProductItem(item: ProductItem): void {
    const results = [...this.getProductItems(), item];
    this.setProduct(results);
  }

  removeProductItem(item: ProductItem): void {
    const results = this.getProductItems().filter(i => i.id !== item.id);
    this.setProduct(results);
  }

  setPageSize(size: number) {
    console.log('size:', size * 25);
    this.pageSize.next(size * 25);
  }

  addToSelectedProducts(item: any) {
    const currSelections = this.selectedProducts.value;
    const updatedSelections = [...currSelections, item];
    console.log({ currSelections });
    console.log({ updatedSelections });
    this.selectedProducts.next(updatedSelections);
  }

  clearSelections() {
    this.selectedProducts.next([]);
  }

}
