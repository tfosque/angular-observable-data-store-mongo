import { ProductItem } from 'src/app/models/cart-item';
import { ProductService } from './../../../services/product.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-thumbs',
  templateUrl: './thumbs.component.html',
  styleUrls: ['./thumbs.component.scss']
})
export class ThumbsComponent implements OnInit {
  @Input() imgUrl = '';
  @Input() label = '';
  selected = false;
  selectedLabel = '';
  constructor(
    private readonly productService: ProductService
  ) { }

  ngOnInit(): void {
    /* this.productService.selectedProducts$.subscribe((s: ProductItem[]) => {     
    }); */
  }

  toggleSelected() {
    this.selected = !this.selected;
  }

}
