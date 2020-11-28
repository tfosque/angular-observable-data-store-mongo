import { ShoppingCartService } from './../../../services/shopping-cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})


// TODO: Remove onChangePush Detection
export class ListComponent implements OnInit {
  @Input() items: any[] = [];

  constructor(
    private readonly cartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
  }

  deleteItem(item: CartItem) {
    console.log({ item });
    this.cartService.removeCartItem(item);
  }

}
