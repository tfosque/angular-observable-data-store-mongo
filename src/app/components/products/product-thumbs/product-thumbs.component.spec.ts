import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductThumbsComponent } from './product-thumbs.component';

describe('ProductThumbsComponent', () => {
  let component: ProductThumbsComponent;
  let fixture: ComponentFixture<ProductThumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductThumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductThumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
