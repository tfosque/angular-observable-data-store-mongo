import { HomeComponent } from './../components/home/home.component';
import { BehaviorSubject } from 'rxjs';
import { ViewContainerRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  defaultCompRef = ViewContainerRef;

  // modalComp = new BehaviorSubject<ComponentRef<any>>(this.defaultCompRef);

  constructor(public viewContainerRef: ViewContainerRef) { }
  setModalComponent() {
    // this.modalComp
  }
}
