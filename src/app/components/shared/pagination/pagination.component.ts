import { ProductStoreService } from './../../../services/product-store.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  currActive = '1';
  constructor(
    private readonly productService: ProductStoreService
  ) { }

  ngOnInit(): void {
  }

  setActive(evt: any) {
    // console.log(typeof evt.target.text);
    const page = evt.target.text;
    this.currActive = page;
    // this.productStoreService.setPageSize(parseInt(page, 10));
  }

}
