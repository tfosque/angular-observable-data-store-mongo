import { MenuService } from './../../services/menu.service';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  cartCount = 0;
  activeMenuItem = '';
  constructor(
    private readonly cartService: CartService,
    private readonly menuService: MenuService
  ) { }

  ngOnInit(): void {
    /* Get Cart Items */
    this.cartService.getCartItems();
    /* Get CartCount */
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
      // console.log({ count });
    });
    /* Set Active Menu */
    this.menuService.activeMenuItem.subscribe(item => {
      this.activeMenuItem = item;
    });
  }

}
