import { CartItem } from './../../models/cart-item';
import { ProductStoreService } from './../../services/product-store.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CartService } from './../../services/cart.service';
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
  // resetSelected$ = new BehaviorSubject<boolean>(false);
  constructor(
    // private readonly productService: ProductService,
    private readonly menuService: MenuService,
    private readonly cartService: CartService,
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

    /* Get Selected Products */
    this.productObsStore.getSelectedProducts()
      .subscribe(updateSelections => {
        this.selectedProducts.next(updateSelections);
        console.log({ updateSelections });
      });

    /* Get Product Cnt */
    this.productObsStore.getProductCnt()
      .subscribe(cnt => {
        this.productsCount = cnt;
      });

    /* Get Selected Product Cnt */
    this.productObsStore.getSelectedProductsCnt().subscribe(selectedCnt => {
      console.log({ selectedCnt });
      this.selectedProductsCount = selectedCnt.length;
    });
  }
  saveSelectionsToCart(sels: CartItem[]): void {
    // console.log('sels:', { sels });
    this.cartService.saveSelectionsToCart(sels);

    /* reset all selected products styles */
    // this.resetSelected$.next(true);
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

  /* resetSelected() {
    this.resetSelected$ = true;
  } */

  clearSelections() {
    this.productObsStore.clearSelections();
    this.productObsStore.getProducts();
  }
}
