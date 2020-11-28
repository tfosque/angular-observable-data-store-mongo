import { ProductService } from './../../services/product.service';
import { CartItem, ProductItem } from './../../models/cart-item';
import { BehaviorSubject } from 'rxjs';
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

  /* pagingation */
  pageSize: number;
  constructor(
    private readonly cartService: ShoppingCartService,
    private readonly productService: ProductService
  ) {
    /* Init PageSize */
    this.pageSize = 25;
  }

  ngOnInit(): void {
    /* Get cartitems - only grab cartItems if cart is empty */
    this.cartService.getCartItems();
    this.cartService.cartItems$.subscribe(nextItems => {
      this.cartItems$.next(nextItems);
    });
    /* Watch PageSize */
    this.productService.pageSize$.subscribe((size: number) => {
      this.pageSize = size;
    });

  }

  public getProducts() {
    /* only grab products if products are empty */
    if (this.productItems$.value.length <= 0) {
      this.productService.getProductItems();
    }
    /* watch products for changes */
    this.productService.productItems$.subscribe(items => {
      this.productItems$.next(items);
    });
  }

}
