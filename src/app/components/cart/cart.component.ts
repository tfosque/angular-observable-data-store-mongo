import { ProductService } from './../../services/product.service';
import { CartItem } from './../../models/cart-item';
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
  constructor(
    private readonly cartService: ShoppingCartService,
    private readonly productService: ProductService
  ) { }

  ngOnInit(): void {
    /* Get cartitems */
    // console.log('items:', this.cartService.getCartItems());
    this.cartService.getCartItems();
    this.cartService.cartItems$.subscribe(nextItems => {
      this.cartItems$.next(nextItems);
    });
  }

  public getProducts() {
    this.productService.getProductItems();
    this.productService.productItems$.subscribe(products => {
      console.log({ products });
    });
  }

}
