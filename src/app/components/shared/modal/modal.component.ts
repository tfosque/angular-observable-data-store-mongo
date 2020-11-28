import { CartItem } from './../../../models/cart-item';
import { ShoppingCartService } from './../../../services/shopping-cart.service';
import { ProductService } from './../../../services/product.service';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  // TODO: Change Detection Remove
  @Input() products = new BehaviorSubject<ProductItem[]>([]);

  constructor(
    private readonly productService: ProductService,
    private readonly cartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
  }

  setPage(evt: any) {
    console.log({ evt });
  }

  addSelected(item: any) {
    console.log({ item });
    this.productService.addToSelectedProducts(item);
  }

  saveSelectionsToCart() {
    this.productService.selectedProducts$.subscribe((val: any[]) => {
      this.cartService.addCartItems(val);
    });
  }

  clearSelections() {
    this.productService.clearSelections();
  }

}
