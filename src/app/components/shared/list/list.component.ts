import { ProductPageService } from './../../../services/product-page.service';
import { Router } from '@angular/router';
import { ProductStoreService } from './../../../services/product-store.service';
import { CartService } from './../../../services/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/cart-item';

// TODO Rename this component to cartList/ cartListItem

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})


// TODO Remove onChangePush Detection
export class ListComponent implements OnInit {
  @Input() items: any[] = [];

  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductStoreService,
    private readonly route: Router,
    private readonly productPageService: ProductPageService
  ) { }

  ngOnInit(): void { }

  clearCart() {
    this.cartService.clearCart();
  }

  goToPDP(evt, product: Product) {
    evt.preventDefault();
    // console.log({ product });
    this.productPageService.setProductPage(product);
    // this.productService.setProductPage(product);
    this.route.navigate(['products/details', product.productId]);
  }

  deleteItem(item: Product) {
    this.cartService.removeCartItem(item);
  }

}
