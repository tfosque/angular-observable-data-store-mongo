import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _opened: boolean = false;


  title = 'my-data-store';
  constructor() { }

  ngOnInit() { }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}
