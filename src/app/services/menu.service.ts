import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public activeMenuItem = new BehaviorSubject<string>('Store');

  constructor() { }

  setActiveMenu(activeMenu: string) {
    this.activeMenuItem.next(activeMenu);
  }
}
