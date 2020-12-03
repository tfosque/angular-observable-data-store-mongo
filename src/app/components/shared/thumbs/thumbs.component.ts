import { LogoutComponent } from './../../logout/logout.component';
import { BehaviorSubject } from 'rxjs';
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
  // @Input() resetSelected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  selected = false;
  constructor(
    private readonly productService: ProductService
  ) { }

  ngOnInit(): void { }

  toggleSelected() {
    this.selected = !this.selected;
  }

}
