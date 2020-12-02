import { MenuService } from './../../services/menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  constructor(
    private readonly menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.menuService.setActiveMenu('Templates');

  }

}
