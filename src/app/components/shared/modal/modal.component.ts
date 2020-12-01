import { CartItem } from './../../../models/cart-item';
import { ShoppingCartService } from './../../../services/shopping-cart.service';
import { ProductService } from './../../../services/product.service';
import { Component, Input, OnInit } from '@angular/core';
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
export class ModalComponent implements OnInit {
  // TODO: Change Detection Remove
  products = new BehaviorSubject<ProductItem[]>([]);
  cart = new BehaviorSubject<ProductItem[]>([]);
  productCount = 0;

  constructor(
    private readonly productService: ProductService,
    private readonly cartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    const innerCart = new BehaviorSubject<ProductItem[]>([]);

    this.cartService.cartItems$.subscribe(items => {
      innerCart.next(items);
      console.log({ innerCart });
      this.cart.next(items);
    });

    this.productService.products$.subscribe(products => {
      this.products.next(products);
      this.productCount = products.length;
    });
  }
  removeCartItems(products, innerCart): ProductItem[] {
    // console.log({ products }, { innerCart });
    /* Cart Item Ids */
    const cids = innerCart.value.map(item => {
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
    this.productService.addToSelectedProducts(item);
  }

  saveSelectionsToCart() {
    const selectedItems = this.productService.selected_Products;
    console.log({ selectedItems });
    this.cartService.addCartItems(selectedItems);
  }

  clearSelections() {
    this.productService.clearSelections();
  }

}
