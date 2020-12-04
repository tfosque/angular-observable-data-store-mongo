import { CartItem } from './../../models/cart-item';
import { ProductStoreService } from './../../services/product-store.service';
import { NotificationService } from 'src/app/services/notification.service';
import { CartService } from './../../services/cart.service';
import { MenuService } from './../../services/menu.service';
import { ProductItem } from 'src/app/models/cart-item';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, Subscriber } from 'rxjs';
import { Notification } from './../../models/notification';
import { Pagination } from 'src/app/models/pagination';
import { uniqBy, find } from 'lodash';

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
  productsPagination: Pagination = {};

  currCart = new BehaviorSubject<CartItem[]>([]);
  // resetSelected$ = new BehaviorSubject<boolean>(false);
  constructor(
    // private readonly productService: ProductService,
    private readonly menuService: MenuService,
    private readonly cartService: CartService,
    private readonly noteService: NotificationService,
    private readonly productStore: ProductStoreService
  ) { }

  ngOnInit(): void {
    /* Set active menu item */
    this.menuService.setActiveMenu('Store');

    /* Track CartItems */
    this.cartService.getCartItems().subscribe(cart => {
      this.currCart.next(cart);
    });

    /* Get Products - productStore Service */
    this.productStore.getProducts()
      .subscribe((products: ProductItem[]) => {
        this.products.next(products);
      });

    /* Get Selected Products */
    this.productStore.getSelectedProducts()
      .subscribe(updateSelections => {
        this.selectedProducts.next(updateSelections);
        console.log({ updateSelections });
      });

    /* Get Product Cnt */
    this.productStore.getProductCnt()
      .subscribe(cnt => {
        this.productsCount = cnt;
      });

    /* Get Selected Product Cnt */
    this.productStore.getSelectedProductsCnt().subscribe(selectedCnt => {
      // console.log({ selectedCnt });
      this.selectedProductsCount = selectedCnt.length;
    });

    // TODO: Pattern
    /*  this.productStore.setPageSize({ size: 20, start: 0, end: 20 })
       .subscribe(z => {
         // console.log({ z });
       }); */

    this.productStore.setPageSize({ size: 20, start: 0, end: 20 });
    this.productStore.productPagination$.subscribe(page => {
      // console.log({ page });
      this.productsPagination = page;
    });
  }
  saveSelectionsToCart(savedSelections: CartItem[]): void {
    // console.log({ savedSelections });
    this.cartService.saveSelectionsToCart(savedSelections);
    this.clearSelections();
  }

  /* TODO: Redo Notification Component and Service */
  sendNote(note: Notification) {
    // console.log('store:sendNote', { note });
    this.noteService.sendNotification(note);
    setTimeout(() => {
      this.noteService.sendNotification({ message: '', show: false });
    }, 3000);
  }

  /* Track Selected Products */
  addToSelectedProducts(product: ProductItem) {
    // get cart items
    const cc = this.currCart.value;

    /* Filter Check for duplication before adding */
    const answer = find(cc, ['name', product.name]);
    console.log(({ answer }));

    /* Add to selected products  */
    if (answer === undefined) {
      this.productStore.addToSelectedProducts(product);
    }
  }

  /* TODO: Create component to handle state; Set trigger for Style of Clicked Items */
  setClicked(isClicked: boolean) { }

  clearSelections() {
    this.productStore.clearSelections();
    this.productStore.getProducts();
  }

  /* Amazon
   */
}
