import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestiveSellingComponent } from './suggestive-selling.component';

describe('SuggestiveSellingComponent', () => {
  let component: SuggestiveSellingComponent;
  let fixture: ComponentFixture<SuggestiveSellingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestiveSellingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestiveSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
