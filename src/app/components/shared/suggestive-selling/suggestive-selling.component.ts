import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suggestive-selling',
  templateUrl: './suggestive-selling.component.html',
  styleUrls: ['./suggestive-selling.component.scss']
})
export class SuggestiveSellingComponent implements OnInit {
  cats = [
    { name: 'item01', url: 'https://thatcatlife.com/wp-content/uploads/2017/05/Oldcat_opt-e1495479454110-400x200.jpeg' },
    { name: 'item01', url: 'https://lh3.googleusercontent.com/proxy/Wm8WFsqh1-iM_WIBaKDQPsYZxj_kkZw9fj3kA1oKV83WOGJikY_zmqioodTIq9gCy3uiAG528fqyBpsVMfNVqj7ktwlRTGVlUEzBcGxY7uX5E1s9coH5qU461sbO45eX2r18NYlHikkw3L4' },
    { name: 'item01', url: 'https://www.worldsbestcatlitter.com/WBCL/wp-content/uploads/2016/08/cat-food-blog-image2-400x200.jpg' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
