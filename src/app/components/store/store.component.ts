import { ProductStoreService } from './../../services/product-store.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ShoppingCartService } from './../../services/shopping-cart.service';
import { MenuService } from './../../services/menu.service';
import { ProductItem } from 'src/app/models/cart-item';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Notification } from './../../models/notification';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  products = new Subject<ProductItem[]>();
  productsCount = 0;
  selectedProductsCount = 0;
  selectedProducts = new BehaviorSubject<ProductItem[]>([]);
  clicked = false;
  note = {};
  constructor(
    // private readonly productService: ProductService,
    private readonly menuService: MenuService,
    private readonly cartService: ShoppingCartService,
    private readonly noteService: NotificationService,
    private readonly productObsStore: ProductStoreService
  ) { }

  ngOnInit(): void {
    /* Set active menu item */
    this.menuService.setActiveMenu('Store');

    /* Get Products - productObsStore Service */
    this.productObsStore.getProducts()
      .subscribe((products: ProductItem[]) => {
        this.products.next(products);
      });

    /* Get Product Cnt */
    this.productObsStore.getProductCnt()
      .subscribe(cnt => {
        this.productsCount = cnt;
      });
    /* Get Selected Product Cnt */
    this.productObsStore.getSelectedProductsCnt().subscribe(selectedCnt => {
      this.selectedProductsCount = selectedCnt.length;
    });
  }
  saveSelectionsToCart(): void {
    this.cartService.addCartItems(this.selectedProducts.value);

    /* Clear Selected Items */
    this.clearSelections();
  }

  /* TODO: Redo Notification Component and Service */
  sendNote(note: Notification) {
    console.log('store:sendNote', { note });
    this.noteService.sendNotification(note);
    setTimeout(() => {
      this.noteService.sendNotification({ message: '', show: false });
    }, 3000);
  }
  /* Track Selected Products */
  addToSelectedProducts(product: ProductItem) {
    this.productObsStore.addToSelectedProducts(product);
  }

  /* TODO: Create component to handle state; Set trigger for Style of Clicked Items */
  setClicked(isClicked: boolean) { }

  clearSelections() {
    this.productObsStore.clearSelections();
  }
}
