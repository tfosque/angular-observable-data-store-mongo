import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {
  @Input() user = '';

  constructor() { }

  ngOnInit(): void {
  }

}
