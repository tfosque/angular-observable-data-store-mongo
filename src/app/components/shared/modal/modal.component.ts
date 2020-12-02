import { Pagination } from './../../../models/pagination';
import { ProductStoreService } from './../../../services/product-store.service';
import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem, ProductItem } from 'src/app/models/cart-item';
import { filter } from 'lodash';
import { exit } from 'process';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, DoCheck {
  // TODO: Change Detection Remove
  @Input() products = new BehaviorSubject<ProductItem[]>([]);
  @Input() cart$ = new BehaviorSubject<CartItem[]>([]);
  cart = new BehaviorSubject<ProductItem[]>([]);
  productPagination$ = new BehaviorSubject<Pagination>({});
  productCount = 0;

  constructor(
    private readonly productStore: ProductStoreService
  ) { }

  ngOnInit(): void {
    // this.productStore.setPageSize({ size: 50, start: 0, end: 50 });
    this.productStore.productPagination$.subscribe(page => {
      this.productPagination$.next(page);
      console.log({ page });
    });
    this.productStore.getProductCnt()
      .subscribe(cnt => {
        this.productCount = cnt;
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

  setPage(evt: any) {
    // console.log({ evt });
  }

  addSelected(item: any) {
    // console.log({ item });
    // this.productStore.addToSelectedProducts(item);
  }

  saveSelectionsToCart() {
    // const selectedItems = this.productStore.selectedProductsValue;
    // console.log('modal:comp', { selectedItems });
    // this.cartService.addCartItems(selectedItems);
  }

  clearSelections() {
    // this.productStore.clearSelections();
  }

}
