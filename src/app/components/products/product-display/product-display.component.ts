import { ProductPageService } from './../../../services/product-page.service';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/cart-item';
import { NgForm } from '@angular/forms';
import { isEmpty } from 'lodash';
import { ProductDisplay } from 'src/app/models/product-display';

const defaultProduct = {
  name: '',
  images: { thumb: '', url: '' }
};

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.scss']
})
export class ProductDisplayComponent implements OnInit {
  productDisplay = new BehaviorSubject<ProductDisplay>(defaultProduct);
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
  documentLoaded = false;

  constructor(
    private readonly cartService: CartService,
    // private readonly productService: ProductStoreService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly productPageService: ProductPageService
  ) {
    // Init quantity
    // this.form.quantity = 0;
    this.route.params.subscribe(params => {
      this.productId = params.productId;
      // this.productPageService.setProductPagePid(this.productId);
    });
  }

  ngOnInit() {
    this.productPageService.checkCart(this.productId);
    this.productPageService.productPage.subscribe(fromWhatDb => {
      this.productDisplay.next(fromWhatDb);
      /* TODO If not product is return then product is in productsDB */
      if (!isEmpty(fromWhatDb)) {
        this.form.quantity = fromWhatDb.quantity;
      }
      if (fromWhatDb !== undefined && !isEmpty(fromWhatDb.cartId)) {
        this.hasCartId = true;
      }
    });
  }
  addItemToCart(newQty: number) {
    const item = [{ ...this.productDisplay.value, quantity: newQty }];
    this.cartService.saveSelectionsToCart(item);
  }

  updateCart() {
    this.savingDocument = true;
    const item2Update: Product = { ...this.productDisplay.value, quantity: this.form.quantity };
    this.cartService.updateCart(item2Update);
    /* Need time to save results before displaying in cart */
    setTimeout(() => {
      this.savingDocument = false;
      this.router.navigate(['shopping-cart']);
    }, 1000);
  }

  submitPDPQauntity(form: NgForm) {
    this.addItemToCart(form.value.quantity);
  }

}
