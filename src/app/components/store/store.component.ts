import { NotificationService } from 'src/app/services/notification.service';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { MenuService } from './../../services/menu.service';
import { ProductItem } from 'src/app/models/cart-item';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { BehaviorSubject, of } from 'rxjs';
import { Notification } from './../../models/notification';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  products = new BehaviorSubject<ProductItem[]>([]);
  productsCount = 0;
  selectedProducts = new BehaviorSubject<ProductItem[]>([]);
  clickedId = '';
  clicked = false;
  note = {};
  constructor(
    private readonly productService: ProductService,
    private readonly menuService: MenuService,
    private readonly cartService: ShoppingCartService,
    private readonly noteService: NotificationService
  ) { }

  ngOnInit(): void {
    this.menuService.setActiveMenu('Store');
    /* Get Products */
    this.productService.getProductItems();
    /* Watch selected product changes */
    this.productService.selectedProducts$.subscribe(selections => {
      this.selectedProducts.next(selections);
      // console.log('store:selected:product:update', { selections });
    });
    /* Watch Products changes */
    this.productService.products$.subscribe(prod => {
      this.products.next(prod);
      this.productsCount = prod.length;
      console.log('store:product:service', { prod });
    });
  }
  saveSelectionsToCart(): void {
    console.log('store:watch:selections:', this.selectedProducts.value);
    this.cartService.addCartItems(this.selectedProducts.value);
    /* Clear Selected Items */
    this.selectedProducts.next([]);
    this.productService.clearSelections();

    /*  this.productService.selectedProducts$.subscribe(selProd => {
       console.log('store:save:sel:toCart', { selProd });
     }); */
  }

  sendNote(note: Notification) {
    console.log('store:sendNote', { note });
    this.noteService.sendNotification(note);
    setTimeout(() => {
      this.noteService.sendNotification({ message: '', show: false });
    }, 4000);
  }

  addToSelectedProducts(product: ProductItem) {
    // this.productService.addToSelectedProducts(product);
    /* Build selected products */
    this.selectedProducts.next([...this.selectedProducts.value, product]);
    this.productService.addToSelectedProducts(product);
    console.log('store:this.selectedProducts:', this.selectedProducts.value);
  }

  /* Set trigger for Style of Clicked Items */
  setClicked(isClicked: boolean) {
    // this.clickedId = id;
    // console.log('clicked', isClicked);
    // console.log('maps:', this.selectedProducts);
  }

  clearSelections() {
    this.productService.clearSelections();
  }
}
