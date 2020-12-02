import { ProductStoreService } from './../../../services/product-store.service';
import { ShoppingCartService } from './../../../services/shopping-cart.service';
import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { ProductItem } from 'src/app/models/cart-item';
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
  cart = new BehaviorSubject<ProductItem[]>([]);
  productCount = 0;

  constructor(
    private readonly productStore: ProductStoreService,
    private readonly cartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    // const innerCart = new BehaviorSubject<ProductItem[]>([]);
    console.log('modal:products:', this.products.value);


    this.cartService.cartItems$.subscribe(cartItems => {
      // innerCart.next(items);
      console.log({ cartItems });
      this.cart.next(cartItems);
    });
  }

  ngDoCheck() {
    // console.log('modal-do check.....');
  }

  getProducts() {
    /* this.productStore.getProducts()
      .subscribe(products => {
        // this.products.next(products);
        // this.productCount = products.length;
        console.log({ products });
      }); */
  }
  removeCartItems(products, cart): ProductItem[] {
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
