import { ShoppingCartService } from './../../../services/shopping-cart.service';
import { CartService } from './../../../services/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';

// TODO: Rename this component to cartList/ cartListItem

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})


// TODO: Remove onChangePush Detection
export class ListComponent implements OnInit {
  @Input() items: any[] = [];

  constructor(
    private readonly cartService: CartService,
    private readonly cartSvc: ShoppingCartService
  ) { }

  ngOnInit(): void {
  }

  clearCart() {
    this.cartService.clearCart();
  }

  deleteItem(item: CartItem) {
    this.cartService.removeCartItem(item);
  }

}
