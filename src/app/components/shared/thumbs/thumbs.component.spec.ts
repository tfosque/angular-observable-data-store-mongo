import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbsComponent } from './thumbs.component';

describe('ThumbsComponent', () => {
  let component: ThumbsComponent;
  let fixture: ComponentFixture<ThumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
