import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-thumbs',
  templateUrl: './thumbs.component.html',
  styleUrls: ['./thumbs.component.scss']
})
export class ThumbsComponent implements OnInit {
  @Input() imgUrl = '';
  @Input() label = '';
  constructor() { }

  ngOnInit(): void {
    console.log('imgUrl', this.imgUrl)
  }

}
