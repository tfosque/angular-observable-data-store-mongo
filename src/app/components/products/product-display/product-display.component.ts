import { ProductPageService } from './../../../services/product-page.service';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ProductStoreService } from './../../../services/product-store.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/cart-item';
import { NgForm } from '@angular/forms';

const defaultProduct = {
  name: ''
};

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.scss']
})
export class ProductDisplayComponent implements OnInit {
  productDisplay = new BehaviorSubject<Product>(defaultProduct);
  productId = '';
  // product = new BehaviorSubject<Product>(defaultProduct);
  product: Product = new Product();
  product$: Observable<Product>;
  // cartItems: Product[] = [];
  productItems: Product[] = [];
  isItemInCart = false;
  subscription: Subscription;
  browserRefresh = false;
  navigated = 0;
  form: any = {};

  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductStoreService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly productPageService: ProductPageService
  ) {
    this.form.quantity = 0;
    this.route.params.subscribe(params => {
      this.productId = params.productId;
      // console.log({ params });
      // this.productPageService.setProductPagePid(this.productId);
    });
  }

  ngOnInit() {
    this.productPageService.checkCart(this.productId);
    this.productPageService.productPage.subscribe(sub => {
      // console.log({ sub })
      this.productDisplay.next(sub);
    });
  }
  addItemToCart(newQty: number) {
    const item = [{ ...this.productDisplay.value, quantity: newQty }];
    this.cartService.saveSelectionsToCart(item);
  }

  updateCart(item: Product) {
    const item2Update: Product = { ...this.productDisplay.value, quantity: this.form.quantity };
    console.log({ item });
    console.log({ item2Update });

    this.cartService.updateCart(item2Update);
  }

  submitPDPQauntity(form: NgForm) {
    this.addItemToCart(form.value.quantity);
  }

}
