import { Pagination } from './../models/pagination';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from '../models/cart-item';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {
  private products$ = new Subject<Product[]>();
  private productsCnt$ = new Subject<number>();
  private selectedProductsCnt$ = new Subject<number>();
  private selectedProducts$ = new BehaviorSubject<Product[]>([]);
  productPageSize$ = new BehaviorSubject<number>(100);
  productPagination$ = new BehaviorSubject<Pagination>({});
  defaulProduct = { name: '', price: 0, total: 0, quantity: 0, qty: 0 };
  productPage$ = new BehaviorSubject<Product>(this.defaulProduct);

  constructor(
    private readonly http: HttpClient
  ) {
    // TODO: Research Best Practices this on fires once per session
    /* this.http.get('http://localhost:3000/api/productsDBs')
      .subscribe((data: Product[]) => {
        this.products$.next(data);
        this.updateProductCnt(data);
        console.log('fetching......');
      }); */
    /* Set default ProductPageSize */
  }

  getProducts(): Observable<Product[]> {
    this.http.get('http://localhost:3000/api/productsDBs')
      .subscribe((data: Product[]) => {
        this.products$.next(data);
        this.updateProductCnt(data);
        // console.log('fetching products......', data);
      });
    return this.products$.asObservable();
  }

  getProduct(productId: string): Observable<Product> {
    // http://localhost:3000/api/carts/findOne?filter=%7B%22where%22%3A%20%7B%22productId%22%3A%20%22V-846498%22%7D%7D
    this.http.get(`http://localhost:3000/api/productsDBs/findOne?filter[where][productId]=${productId}`)
      .subscribe((data: Product) => {
        this.productPage$.next(data);
        // console.log('fetching a product......', { data });
      });
    return this.productPage$.asObservable();
  }

  getProductCnt() {
    return this.productsCnt$.asObservable();
  }

  // #region
  private removeProductItem(item: Product, store): void {
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
  //#endregion

  private setProduct(newItems: Product[]): void {
    this.products$.next(newItems);
    this.updateProductCnt(newItems);
  }

  private updateProductCnt(products: Product[]) {
    this.productsCnt$.next(products.length);
  }

  /* Selected Products */
  getSelectedProducts(): Observable<Product[]> {
    return this.selectedProducts$.asObservable();
  }

  getSelectedProductsCnt() {
    return this.selectedProducts$.asObservable();
  }

  getProductPagination() {
    return this.productPagination$.asObservable();
  }
  addToSelectedProducts(selection: Product) {
    const currSelections = this.selectedProducts$.value;

    this.selectedProducts$.next([...currSelections, selection]);
    // console.log('currSelections:', this.selectedProducts$.value);

    this.updateSelectedProductCnt(currSelections);
    // this.selectedProductsCnt$.next(currSelections.length);
  }

  private updateSelectedProductCnt(products: Product[]) {
    this.selectedProductsCnt$.next(products.length);
  }
  clearSelections() {
    this.selectedProducts$.next([]);
  }

  reFetchProducts() {
    /* Add original products back 500 */
    this.getProducts()
      .subscribe(productUpdate => {
        this.products$.next(productUpdate);
        this.updateProductCnt(productUpdate);
        this.updateSelectedProductCnt([]);
      });
  }


  /* Pagination */
  setPageSize(pg: Pagination): Observable<Pagination> {
    // console.log(pg);
    this.productPagination$.next(pg);
    return this.productPagination$.asObservable();
  }

  setProductPage(product: Product) {
    this.productPage$.next(product);
  }
}
