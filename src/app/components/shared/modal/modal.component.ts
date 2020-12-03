import { CartService } from 'src/app/services/cart.service';
import { Pagination } from './../../../models/pagination';
import { ProductStoreService } from './../../../services/product-store.service';
import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, ProductItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, DoCheck {
  // TODO: Change Detection Remove
  @Input() products = new BehaviorSubject<ProductItem[]>([]);
  @Input() cart$ = new BehaviorSubject<CartItem[]>([]);
  selectedProducts$ = new BehaviorSubject<ProductItem[]>([]);
  cart = new BehaviorSubject<ProductItem[]>([]);
  productPagination$ = new BehaviorSubject<Pagination>({});
  productCount = 0;

  constructor(
    private readonly productStore: ProductStoreService,
    private readonly cartService: CartService
  ) { }

  ngOnInit(): void {
    // this.productStore.setPageSize({ size: 50, start: 0, end: 50 });
    this.productStore.productPagination$.subscribe(page => {
      this.productPagination$.next(page);
      // console.log({ page });
    });
    this.productStore.getProductCnt()
      .subscribe(cnt => {
        this.productCount = cnt;
      });

    this.productStore.getSelectedProducts().subscribe(x => {
      this.selectedProducts$.next(x);
      // console.log({ x });
    });
  }

  ngDoCheck() {
    // console.log('modal-do check.....');
  }

  getProducts() { }
  removeCartItems(products: ProductItem[], cart: any): ProductItem[] {
    // console.log({ products }, { innerCart });
    /* Cart Item Ids */
    const cids = cart.value.map(item => {
      // console.log({ item });
      return item.name;
    });
    // console.log({ cids });
    /* Filter Products with cart item ids */

    function cartNames(fname) {
      return cids.map(m => {
        // console.log(m === fname)
        return m === fname;
      });
      // return;
    }
    /* outer filter */
    return products.filter((f: any) => {
      // console.log(cartNames(f.name))
      return cartNames(f.name) ? (
        f = { ...f, selected: true }
        // console.log(f)
      ) : null;
    });
    // return [];
  }

  setPage(page: Pagination) {
    // console.log({ page });
  }

  addSelected(item: ProductItem) {
    console.log({ item });
    this.productStore.addToSelectedProducts(item);
  }

  saveSelectionsToCart(): void {
    this.cartService.saveSelectionsToCart(this.selectedProducts$.value);
  }

  clearSelections() {
    this.productStore.clearSelections();
  }

}
