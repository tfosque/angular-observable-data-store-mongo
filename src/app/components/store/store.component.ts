import { ProductPageService } from './../../services/product-page.service';
import { NotificationService } from './../../services/notification.service';
import { ProductStoreService } from './../../services/product-store.service';
import { CartService } from './../../services/cart.service';
import { MenuService } from './../../services/menu.service';
import { Product } from 'src/app/models/cart-item';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Notification } from './../../models/notification';
import { Pagination } from 'src/app/models/pagination';
import { find } from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  products = new Subject<Product[]>();
  productsCount = 0;
  selectedProductsCount = 0;
  selectedProducts = new BehaviorSubject<Product[]>([]);
  clicked = false;
  note = {};
  productsPagination: Pagination = {};

  currCart = new BehaviorSubject<Product[]>([]);
  // resetSelected$ = new BehaviorSubject<boolean>(false);
  constructor(
    // private readonly productService: ProductService,
    private readonly menuService: MenuService,
    private readonly cartService: CartService,
    private readonly noteService: NotificationService,
    private readonly productStore: ProductStoreService,
    private readonly productPageService: ProductPageService,
    private readonly route: Router
  ) { }

  ngOnInit(): void {
    /* Set active menu item */
    this.menuService.setActiveMenu('Store');

    /* Track CartItems */
    this.cartService.getCartItems().subscribe(cart => {
      this.currCart.next(cart);
    });

    /* Get Products - productStore Service */
    this.productStore.fetchProducts()
      .subscribe((products: Product[]) => {
        this.products.next(products);
      });

    /* Get Selected Products */
    this.productStore.getSelectedProducts()
      .subscribe(updateSelections => {
        this.selectedProducts.next(updateSelections);
        // console.log({ updateSelections });
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

    this.productStore.setPageSize({ size: 60, start: 0, end: 60 });
    this.productStore.productPagination$.subscribe(page => {
      // console.log({ page });
      this.productsPagination = page;
    });
  }
  saveSelectionsToCart(savedSelections: Product[]): void {
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
  addToSelectedProducts(product: Product) {
    // get cart items
    const cc = this.currCart.value;

    /* Filter Check for duplication before adding */
    const answer = find(cc, ['name', product.name]);
    // console.log(({ answer }));

    /* Add to selected products  */
    if (answer === undefined) {
      this.productStore.addToSelectedProducts(product);
    }
  }

  /* TODO: Create component to handle state; Set trigger for Style of Clicked Items */
  setClicked(isClicked: boolean) { }

  clearSelections() {
    this.productStore.clearSelections();
    this.productStore.fetchProducts();
  }

  goToPDP(product: Product) {
    // this.productStore.setProductPage(product);
    this.productPageService.setProductPage(product);
    this.route.navigate(['/products/details', product.productId]);
  }
}
