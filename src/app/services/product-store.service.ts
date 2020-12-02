import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ProductItem } from '../models/cart-item';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {
  private products$ = new Subject<ProductItem[]>();
  private productsCnt$ = new Subject<number>();
  private selectedProductsCnt$ = new Subject<number>();
  private selectedProducts$ = new BehaviorSubject<ProductItem[]>([]);
  pageSize$ = new BehaviorSubject<number>(25);

  constructor(
    private readonly http: HttpClient
  ) {
    // Research Best Practices this on fires once per session
    /* this.http.get('http://localhost:3000/api/productsDBs')
      .subscribe((data: ProductItem[]) => {
        this.products$.next(data);
        this.updateProductCnt(data);
        console.log('fetching......');
      }); */
  }

  getProducts(): Observable<ProductItem[]> {
    this.http.get('http://localhost:3000/api/productsDBs')
      .subscribe((data: ProductItem[]) => {
        this.products$.next(data);
        this.updateProductCnt(data);
        console.log('fetching......');
      });
    return this.products$.asObservable();
  }

  getProductCnt() {
    return this.productsCnt$.asObservable();
  }

  // #region
  private removeProductItem(item: ProductItem, store): void {
    // console.log({ store });
    if (item === null) {
      this.setProduct(store);
      return;
    }
    const results = store.filter(i => i.id !== item.id);
    this.setProduct(results);
    console.log('product:service:', { item });
    console.log('product:service:length:', results.length);
  }
  //#endregion

  private setProduct(newItems: ProductItem[]): void {
    this.products$.next(newItems);
    this.updateProductCnt(newItems);
  }

  private updateProductCnt(products: ProductItem[]) {
    this.productsCnt$.next(products.length);
  }

  /* Selected Products */
  getSelectedProducts(): Observable<ProductItem[]> {
    return this.selectedProducts$.asObservable();
  }

  getSelectedProductsCnt() {
    return this.selectedProducts$.asObservable();
  }
  addToSelectedProducts(selection: ProductItem) {
    const currSelections = this.selectedProducts$.value;

    this.selectedProducts$.next([...currSelections, selection]);
    console.log('currSelections:', this.selectedProducts$.value);

    this.updateSelectedProductCnt(currSelections);
    // console.log('cnt', currSelections.length);
  }

  private updateSelectedProductCnt(products: ProductItem[]) {
    this.selectedProductsCnt$.next(products.length);
  }
  clearSelections() {
    this.selectedProducts$.next([]);
    /* Add original products back 500 */
    const fetchProducts = this.getProducts();
    fetchProducts.subscribe(productUpdate => {
      this.products$.next(productUpdate);
      this.updateProductCnt(productUpdate);
      this.updateSelectedProductCnt([]);
    });
  }


  /* Paging */
  setPageSize(size: number) { }
}
