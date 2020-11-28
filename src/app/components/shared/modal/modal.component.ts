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

  constructor() { }

  ngOnInit(): void {
  }

  setPage(evt: any) {
    console.log({ evt });
  }

}
