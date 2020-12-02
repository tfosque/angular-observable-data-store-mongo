import { Pagination } from './../../models/pagination';
import { MenuService } from './../../services/menu.service';
import { ProductService } from './../../services/product.service';
import { ProductStoreService } from './../../services/product-store.service';
import { CartItem, ProductItem } from './../../models/cart-item';
import { BehaviorSubject, Subject } from 'rxjs';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems$ = new BehaviorSubject<CartItem[]>([]);
  productItems$ = new BehaviorSubject<ProductItem[]>([]);
  products = new Subject<ProductItem[]>();

  /* pagingation */
  cartPageSize: number;
  productPagination: Pagination = {};
  constructor(
    private readonly cartService: ShoppingCartService,
    private readonly productObsStore: ProductStoreService,
    private readonly menuService: MenuService
  ) {
    /* Init PageSize */
    this.cartPageSize = 25;
  }

  ngOnInit(): void {
    this.menuService.setActiveMenu('Shopping Cart');

    /* Get cartitems - only grab cartItems if cart is empty */
    this.cartService.getCartItems();
    this.cartService.cartItems$.subscribe(nextItems => {
      this.cartItems$.next(nextItems);
    });

    /* Watch PageSize for pagination */
    /*  this.productObsStore.productPageSize$.subscribe((size: number) => {
       this.cartPageSize = size;
     }); */
  }

  public getProducts() {
    this.productObsStore.setPageSize({ size: 50, start: 0, end: 50 });
    this.productObsStore.getProducts()
      .subscribe(nextProducts => {
        this.products.next(nextProducts);
        console.log({ nextProducts });
      });
  }

  setProductPagination(page: Pagination) {
    this.productObsStore.setPageSize(page);
  }

  clearCart() {
    this.cartService.clearCart();
  }

}
