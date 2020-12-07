import { ProductPageService } from './../../../services/product-page.service';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ProductStoreService } from './../../../services/product-store.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/cart-item';
import { NgForm } from '@angular/forms';
import { isEmpty } from 'lodash';

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
  product: Product = new Product();
  product$: Observable<Product>;
  // cartItems: Product[] = [];
  productItems: Product[] = [];
  // isItemInCart = false;
  hasCartId = false;
  subscription: Subscription;
  browserRefresh = false;
  navigated = 0;
  form: any = {};
  savingDocument = false;

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
      // this.productPageService.setProductPagePid(this.productId);
    });
  }

  ngOnInit() {
    this.productPageService.checkCart(this.productId);
    this.productPageService.productPage.subscribe(sub => {
      console.log({ sub });
      this.productDisplay.next(sub);
      this.form.quantity = sub.quantity;
      if (!isEmpty(sub.cartId)) {
        this.hasCartId = true;
      }
    });
  }
  addItemToCart(newQty: number) {
    const item = [{ ...this.productDisplay.value, quantity: newQty }];
    this.cartService.saveSelectionsToCart(item);
  }

  updateCart(item: Product) {
    this.savingDocument = true;
    // TODO: item is not being used
    const item2Update: Product = { ...this.productDisplay.value, quantity: this.form.quantity };
    this.cartService.updateCart(item2Update);
    setTimeout(() => {
      this.savingDocument = false;
      this.router.navigate(['shopping-cart']);
    }, 1000);
  }

  submitPDPQauntity(form: NgForm) {
    this.addItemToCart(form.value.quantity);
  }

}
