import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProductStoreService } from './../../../services/product-store.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/cart-item';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.scss']
})
export class ProductDisplayComponent implements OnInit {
  defaulProduct = { name: '', price: 0, total: 0, quantity: 0 };
  productDisplay = new BehaviorSubject<Product>(this.defaulProduct);

  form: any = {};

  constructor(
    private readonly productStore: ProductStoreService,
    private readonly cartService: CartService,
    private readonly route: ActivatedRoute
  ) {
    this.form.quantity = 0;
  }

  ngOnInit(): void {
    // this.productStore.setProductPage(this.product);

    console.log('productDisplay:', this.productDisplay.value);

    this.route.params.subscribe(params => {
      this.productStore.getProduct(params.productId);
    });
    this.productStore.productPage$.subscribe(np => {
      this.form.quantity = np.quantity;
      console.log(this.form);
      this.productDisplay.next(np);
    });
  }

  addItemToCart(newQty: number) {
    // console.log({ newQty });

    const item = [{ ...this.productDisplay.value, quantity: newQty }];
    console.log(item);
    this.cartService.saveSelectionsToCart(item);
  }

  submitPDPQauntity(form: NgForm) {
    this.addItemToCart(form.value.quantity);
  }

}
