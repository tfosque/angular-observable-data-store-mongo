import { TestBed } from '@angular/core/testing';

import { ProductObsService } from './product-obs.service';

describe('ProductObsService', () => {
  let service: ProductObsService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductObsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
