import { MenuService } from './../../services/menu.service';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  cartCount = 0;
  activeMenuItem = '';
  constructor(
    private readonly cartService: ShoppingCartService,
    private readonly menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
    this.menuService.activeMenuItem.subscribe(item => {
      this.activeMenuItem = item;
    });
  }

}
