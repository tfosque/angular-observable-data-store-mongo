import { Pagination } from './../../models/pagination';
import { MenuService } from './../../services/menu.service';
import { ProductStoreService } from './../../services/product-store.service';
import { Product } from './../../models/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems$ = new BehaviorSubject<Product[]>([]);
  productItems$ = new BehaviorSubject<Product[]>([]);
  products = new Subject<Product[]>();
  // selectedProducts$ = new BehaviorSubject<ProductItem[]>([]);

  /* pagingation */
  cartPageSize: number;
  productPagination: Pagination = {};
  constructor(
    private readonly cartService: CartService,
    private readonly productObsStore: ProductStoreService,
    private readonly menuService: MenuService
  ) {
    /* Init PageSize */
    this.cartPageSize = 25;
  }

  ngOnInit(): void {
    this.menuService.setActiveMenu('Shopping Cart');

    /* Get cartitems - only grab cartItems if cart is empty */
    this.cartService.fetchCartItems();
    this.cartService.cart$.subscribe(nextItems => {
      this.cartItems$.next(nextItems);
      // console.log({ nextItems });

    });

    /* Watch PageSize for pagination */
    /*  this.productObsStore.productPageSize$.subscribe((size: number) => {
       this.cartPageSize = size;
     }); */
  }

  public getProducts() {
    this.productObsStore.setPageSize({ size: 50, start: 0, end: 50 });
    /* Get Products */
    this.productObsStore.getProducts()
      .subscribe(nextProducts => {
        this.products.next(nextProducts);
        // console.log({ nextProducts });
      });
  }

  setProductPagination(page: Pagination) {
    this.productObsStore.setPageSize(page);
  }

  clearCart() {
    this.cartService.clearCart();
  }

}
